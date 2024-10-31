// utils/AppError.ts
export class AppError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true; // This helps distinguish operational errors from programming errors
    Error.captureStackTrace(this, this.constructor);
  }
}