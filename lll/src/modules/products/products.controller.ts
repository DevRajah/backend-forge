import { Request, Response } from "express";
import * as productsService from "./products.service";

// I keep controller logic focused on HTTP request and response handling.
export const getAllProducts = async (req: Request, res: Response) => {
  const data = await productsService.findAllProducts();

  res.status(200).json({
    success: true,
    message: "Products fetched successfully",
    data,
  });
};

export const getProductsById = async (req: Request, res: Response) => {
  const data = await productsService.findProductsById(req.params.id);

  res.status(200).json({
    success: true,
    message: "Products fetched successfully",
    data,
  });
};

export const createProducts = async (req: Request, res: Response) => {
  const data = await productsService.createProducts(req.body);

  res.status(201).json({
    success: true,
    message: "Products created successfully",
    data,
  });
};

export const updateProducts = async (req: Request, res: Response) => {
  const data = await productsService.updateProducts(req.params.id, req.body);

  res.status(200).json({
    success: true,
    message: "Products updated successfully",
    data,
  });
};

export const deleteProducts = async (req: Request, res: Response) => {
  await productsService.deleteProducts(req.params.id);

  res.status(200).json({
    success: true,
    message: "Products deleted successfully",
  });
};
