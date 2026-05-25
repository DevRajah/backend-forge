import { Router } from "express";
import healthRoutes from "./health.routes";

const router = Router();

// I register all route groups here so app.ts stays clean.
router.use("/", healthRoutes);

export default router;