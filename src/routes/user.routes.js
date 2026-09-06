import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/user.controllers.js";

export const userRouter = Router();


userRouter.post("/user", createUser);
userRouter.get("/user", getAllUsers);
userRouter.get("/user", getUserById);
userRouter.put("/user", updateUser);
userRouter.delete("/user", deleteUser);