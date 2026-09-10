import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const RoleModel = sequelize.define(
  "Rol",
  {
    rolename: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    // Other model options go here
    // createdAt: "created_at",
    // updatedAt: false,
    // timestamps: false,
  },
);
