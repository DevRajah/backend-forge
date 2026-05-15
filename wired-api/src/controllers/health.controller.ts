import { Request, Response } from "express";

// I keep the health check logic in a controller so the route file stays clean.
export const getHealthStatus = (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "API health check passed",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
};