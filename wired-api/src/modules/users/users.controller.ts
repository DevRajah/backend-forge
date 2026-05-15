import { Request, Response } from "express";
import * as usersService from "./users.service";

// I keep controller logic focused on HTTP request and response handling.
export const getAllUsers = async (req: Request, res: Response) => {
  const data = await usersService.findAllUsers();

  res.status(200).json({
    success: true,
    message: "Users fetched successfully",
    data,
  });
};

// I keep this controller ready for creating new users records later.
export const createUsers = async (req: Request, res: Response) => {
  const data = await usersService.createUsers(req.body);

  res.status(201).json({
    success: true,
    message: "Users created successfully",
    data,
  });
};
