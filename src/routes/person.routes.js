import { Router } from "express";
import {
  createPerson,
  deletePerson,
  getAllPersons,
  getPersonById,
  updatePerson,
} from "../controllers/person.controllers.js";

export const personRouter = Router();

personRouter.post("/person", createPerson);
personRouter.get("/person", getAllPersons);
personRouter.get("/person", getPersonById);
personRouter.put("/person", updatePerson);
personRouter.delete("/person", deletePerson);
