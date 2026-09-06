import { Router } from "express";
import {
    createTask,
    deleteTask,
    getAllTasks,
    getTaskById,
    updateTask,
  
} from "../controllers/task.controllers.js";

export const taskRouter = Router();


taskRouter.post("/task", createTask);
taskRouter.get("/task", getAllTasks);
taskRouter.get("/task", getTaskById);
taskRouter.put("/task", updateTask);
taskRouter.delete("/task", deleteTask);