import { Request, Response, NextFunction } from "express";

// Define a custom error interface that includes a statusCode
interface CustomError extends Error {
  statusCode?: number;
}

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Default to a 500 status code if it's not specified
  const statusCode = err.statusCode || 500;

  // Send a generic error message if not specified
  const message = err.message || "An unexpected error occurred";

  // Log the error for debugging (could use a more sophisticated logger here)
  console.error(err);

  // Send the error response
  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message,
  });
};
