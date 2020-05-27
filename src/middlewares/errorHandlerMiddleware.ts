import { Request, Response, NextFunction } from "express";
import HttpException from "../exceptions/HttpException";

function errorMiddleware(
  error: HttpException,
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { statusCode, message, reason } = error;

  response.status(statusCode).json({
    status: "error",
    statusCode,
    message,
    reason,
  });
}

export default errorMiddleware;
