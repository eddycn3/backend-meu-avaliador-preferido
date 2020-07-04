import { Request, Response, NextFunction } from "express";

export class HttpExceptionError extends Error {
  statusCode?: number;
  message: string;
  reason?: string;

  constructor(message: string, statusCode?: number, reason?: string) {
    super();
    this.statusCode = statusCode;
    this.message = message;
    this.reason = reason;
  }

  public toString = (): string => {
    return `HttpExceptionError (statusCode : ${this.statusCode}, message : ${this.message}, reason : ${this.reason})`;
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
  const msg = error.message || "Algo ocorreu de errado";
  return response.status(status).json({
    status,
    msg,
  });
}
