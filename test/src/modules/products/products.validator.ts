import { z } from "zod";

// I validate create requests before they reach the controller.
export const createProductsSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
});

// I validate update requests and allow partial updates.
export const updateProductsSchema = createProductsSchema.partial();
