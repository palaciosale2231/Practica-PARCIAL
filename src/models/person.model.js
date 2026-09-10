import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const PersonModel = sequelize.define(
  "Person",
  {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
  },
  {
    // Other model options go here
    // createdAt: "created_at",
    // updatedAt: false,
    // timestamps: false,
  },
);
