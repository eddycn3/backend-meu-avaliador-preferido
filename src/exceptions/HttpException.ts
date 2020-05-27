class HttpException extends Error {
  statusCode: number;
  message: string;
  reason: string;

  constructor(status: number, message: string, reason: string) {
    super();
    this.statusCode = status;
    this.message = message;
    this.reason = reason;
  }
}

export default HttpException;
