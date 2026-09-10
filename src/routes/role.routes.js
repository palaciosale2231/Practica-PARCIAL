import { Router } from "express";
import {
  createRole,
  deleteRole,
  getAllRoles,
  getRoleById,
  updateRole,
} from "../controllers/role.controllers.js";

export const roleRouter = Router();

roleRouter.post("/rol", createRole);
roleRouter.get("/rol", getAllRoles);
roleRouter.get("/rol", getRoleById);
roleRouter.put("/rol", updateRole);
roleRouter.delete("/rol", deleteRole);
