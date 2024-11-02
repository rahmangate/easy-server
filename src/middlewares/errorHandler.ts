import { Request, Response, NextFunction } from "express";

interface CustomError extends Error {
  statusCode?: number;
}

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;

  const message = err.message || "An unexpected error occurred";

  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message,
  });
};
