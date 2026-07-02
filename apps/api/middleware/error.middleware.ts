import { Request, Response, NextFunction } from "express";
import { Prisma } from "@prisma/client";
import { ApiError } from "../utils/ApiError.utils";

const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): Response => {

  let statusCode = 500;
  let message = "Internal Server Error";
  let errors: unknown[] = [];

  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
    errors = err.errors;
  }

  else if (err instanceof Prisma.PrismaClientKnownRequestError) {

    switch (err.code) {

      case "P2002":
        statusCode = 409;
        message = "Duplicate field value entered.";
        break;

      case "P2025":
        statusCode = 404;
        message = "Requested resource not found.";
        break;

      default:
        statusCode = 500;
        message = "Database error.";
    }
  }

  else if (err instanceof Prisma.PrismaClientValidationError) {

    statusCode = 400;
    message = "Invalid request data.";

  }

  console.error(err);

  return res.status(statusCode).json({
    statusCode,
    success: false,
    message,
    errors,
  });

};

export default errorMiddleware;