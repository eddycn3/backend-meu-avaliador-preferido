import { Request, Response, NextFunction } from "express";

export class HttpExceptionError extends Error {
  statusCode: number;
  errorMsg: string;
  reason?: string;

  constructor(statusCode: number, message: string, reason?: string) {
    super();
    this.statusCode = statusCode;
    this.errorMsg = message;
    this.reason = reason;
  }

  public toString = (): string => {
    return `HttpExceptionError (statusCode : ${this.statusCode}, message : ${this.errorMsg}, reason : ${this.reason})`;
  };
}

export function handleError(
  error: HttpExceptionError,
  request: Request,
  response: Response,
  next: NextFunction
) {
  console.log(error.toString());
  const status = error.statusCode || 500;
  const errorMsg = error.errorMsg || "Algo ocorreu de errado";
  return response.status(status).json({
    errorMsg,
  });
}
