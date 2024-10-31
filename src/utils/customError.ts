// src/utils/CustomError.ts

export class CustomError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;

    // Required to make sure the prototype chain is maintained
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}
