// I use this custom error class so I can attach HTTP status codes to errors.
export class ApiError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);

    this.statusCode = statusCode;
    this.name = "ApiError";
  }
}