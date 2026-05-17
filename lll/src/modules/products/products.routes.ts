import { Router } from "express";
import {
  createProducts,
  deleteProducts,
  getAllProducts,
  getProductsById,
  updateProducts,
} from "./products.controller";

const router = Router();

router.get("/", getAllProducts);
router.get("/:id", getProductsById);
router.post("/", createProducts);
router.patch("/:id", updateProducts);
router.delete("/:id", deleteProducts);

export default router;
