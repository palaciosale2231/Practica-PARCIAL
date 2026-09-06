import { Router } from "express";
import {
  createUser,
  
  getAllUsers,
} from "../controllers/user.controllers.js";

export const userRouter = Router();

userRouter.get("/user", getAllUsers);
userRouter.post("/user", createUser);
userRouter.post("/user", createUser);
userRouter.post("/user", createUser);
userRouter.post("/user", createUser);
userRouter.post("/user", createUser);