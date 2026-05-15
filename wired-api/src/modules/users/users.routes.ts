import { Router } from "express";
import {
  createUsers,
  getAllUsers,
} from "./users.controller";

const router = Router();

// I expose GET / so I can list users records.
router.get("/", getAllUsers);

// I expose POST / so I can create a new users record.
router.post("/", createUsers);

export default router;
