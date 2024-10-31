import { Request, Response, NextFunction } from "express";
import Employee from "../models/Employee";
import AuthManager from "../services/authManager";

interface AuthRequest extends Request {
  employee?: any;
}

export const protect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  let token = req.header("auth-token");

  if (token) {
    try {
      const decoded = AuthManager.verifyToken(token);
      req.employee = await Employee.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      res.status(401).json({ success: false, message: "Not authorized" });
    }
  } else {
    res.status(401).json({ success: false, message: "No token provided" });
  }
};
