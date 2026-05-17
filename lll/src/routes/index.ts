import { Router } from "express";
import healthRoutes from "./health.routes";
import productsRoutes from "../modules/products/products.routes";

const router = Router();

// I register all route groups here so app.ts stays clean.
router.use("/", healthRoutes);

router.use("/products", productsRoutes);

export default router;