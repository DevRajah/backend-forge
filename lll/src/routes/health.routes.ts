import { Router } from "express";
import { getHealthStatus } from "../controllers/health.controller";

const router = Router();

// I expose a health endpoint so deployments and monitoring tools can check if the API is alive.
router.get("/health", getHealthStatus);

export default router;