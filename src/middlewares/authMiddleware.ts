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
      await AuthManager.verifyToken(token);
      next();
    } catch (error) {
      res.status(401).json({ success: false, message: error });
    }
  } else {
    res.status(401).json({ success: false, message: "No token provided" });
  }
};
