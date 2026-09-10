import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const UserRoleModel = sequelize.define(
  "User_rol",
  {},
  {
    // Other model options go here
    // createdAt: "created_at",
    // updatedAt: false,
    // timestamps: false,
  },
);
