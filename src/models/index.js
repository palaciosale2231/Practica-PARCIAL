import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js"
import { UserModel } from "./user.model.js";
import { PersonModel } from "./person.model.js";

//relacion 1a1 

//un usuario pertenece a una persona.
UserModel.belongsTo(PersonModel, {foreignKey: "person_id", as: "owner"})