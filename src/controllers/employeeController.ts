import { Request, Response, NextFunction } from "express";
import Employee from "../models/Employee";
import mongoose from "mongoose";

export const createEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      username,
      email,
      locationId,
      organizationId,
      partnerId,
      payrollId,
      employerPayrollId,
      accessRole,
      role,
    } = req.body;

    const employeeId = new mongoose.Types.ObjectId();
    const id = new mongoose.Types.ObjectId();
    const employee = new Employee({
      username,
      email,
      locationId,
      organizationId,
      partnerId,
      payrollId,
      employeeId,
      id,
      employerPayrollId,
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
