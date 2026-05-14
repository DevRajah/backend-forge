import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError.ts";

// I convert unknown routes into a proper 404 error.
export const notFoundMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  next(new ApiError(404, `Route not found: ${req.originalUrl}`));
};