import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

class AppError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number = 400) {
    super(message);
    this.statusCode = statusCode;
  }
}

const handleErrors = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  interface obj {
    [chave: string]: any;
  }

  if (err instanceof ZodError) {
    const errorObj = err.errors.reduce((obj: obj, err) => {
      const key: string = err.path.join('.');
      obj[key] = err.message;
      return obj;
    }, {});

    return res.status(400).json(errorObj);
  }

  return res.status(500).json({
    message: "Internal server error",
  });
};

export { AppError, handleErrors };
