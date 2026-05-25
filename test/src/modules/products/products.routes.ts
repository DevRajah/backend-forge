import { Router } from "express";
import {
  createProducts,
  deleteProducts,
  getAllProducts,
  getProductsById,
  updateProducts,
} from "./products.controller";
import { validateRequest } from "../../middlewares/validate.middleware";
import {
  createProductsSchema,
  updateProductsSchema,
} from "./products.validator";

const router = Router();

router.get("/", getAllProducts);
router.get("/:id", getProductsById);
router.post("/", validateRequest(createProductsSchema), createProducts);
router.patch("/:id", validateRequest(updateProductsSchema), updateProducts);
router.delete("/:id", deleteProducts);

export default router;
