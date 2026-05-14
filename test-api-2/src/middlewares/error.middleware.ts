import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError.ts";

// I keep all API error responses consistent from one place.
export const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = error instanceof ApiError ? error.statusCode : 500;

  res.status(statusCode).json({
    success: false,
    message: error.message || "Internal server error",
  });
};