import { Request, Response, NextFunction } from "express";
import Employee from "../models/Employee";

export const createEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      name,
      username,
      position,
      department,
      locationId,
      partnerId,
      payrollId,
      accessRole,
      role,
    } = req.body;
    const employee = new Employee({
      name,
      username,
      position,
      department,
      locationId,
      partnerId,
      payrollId,
      accessRole,
      role,
    });
    await employee.save();
    res.status(201).json({ success: true, data: employee });
  } catch (error) {
    next(error);
  }
};

export const getEmployees = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const employees = await Employee.find().populate(
      "locationId",
      "name address"
    );
    res.status(200).json({ success: true, data: employees });
  } catch (error) {
    next(error);
  }
};