import { Request, Response, NextFunction } from "express";
import Employee, { RoleName } from "../models/Employee";

import { AppError } from "../utils/appError";
import { Setting } from "../models/Setting";
import AuthManager from "../services/authManager";

export const registerEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;

    const existingEmployee = await Employee.findOne({ email });

    if (existingEmployee) {
      throw new AppError("Employee already exists", 401);
    }

    const hash = AuthManager.hashPassword(req.body.password);
    const employee = new Employee({
      username: req.body.username,
      email: req.body.email,
      password: hash,
      locationId: req.body.locationId,
      organizationId: req.body.organizationId,
      partnerId: req.body.partnerId,
      payrollId: req.body.payrollId,
      employerPayrollId: req.body.employerPayrollId,
      accessRole: req.body.accessRole,
      role: req.body.role,
    });

    await employee.save();

    res.status(201).json({ success: true });
  } catch (error) {
    next(error);
  }
};

export const loginEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  try {
    // Fetch the employee and settings in parallel
    const [employee, settings] = await Promise.all([
      Employee.findOne({ email }),
      Setting.findOne(),
    ]);

    if (!employee) {
      throw new AppError("Email or password is wrong.", 400);
    }

    const isPasswordValid = await AuthManager.comparePassword(
      password,
      employee.password
    );
    if (!isPasswordValid) {
      throw new AppError("Invalid password.", 400);
    }

    // Prepare the token payload
    const employeePayload = employee.toObject();
    const payload = {
      employeeId: employeePayload._id,
      locationId: employeePayload.locationId,
      organizationId: employeePayload.organizationId,
      partnerId: employeePayload.partnerId,
      payrollId: employeePayload.payrollId,
      employerPayrollId: employeePayload.employerPayrollId,
      accessRole: employeePayload.accessRole,
      role: employeePayload.role,
    };

    // Determine the employees data to return based on role
    let employeesToReturn;

    if (employee.role.name === RoleName.admin) {
      // Only fetch all employees if the user is an admin
      const allEmployees = await Employee.find();
      employeesToReturn = allEmployees.map((emp) => ({
        id: emp._id,
        payrollId: emp.payrollId,
        name: emp.username,
        picture: "https://randomuser.me/api/portraits/men/1.jpg",
      }));
    } else {
      // For regular users, only return their own data
      employeesToReturn = [
        {
          id: employee._id,
          payrollId: employee.payrollId,
          name: employee.username,
          picture: "https://randomuser.me/api/portraits/men/1.jpg",
        },
      ];
    }

    // Generate token
    const token = AuthManager.generateToken(payload);

    // Send the response with the necessary data
    res.header("auth-token", token).json({
      token,
      employee: employeePayload,
      employees: employeesToReturn,
      isGlobalTrackingEnabled: settings?.isGlobalTrackingEnabled,
    });
  } catch (error) {
    next(error);
  }
};
