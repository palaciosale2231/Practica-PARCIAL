import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const TaskModel = sequelize.define(
  "task",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    isComplete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
  },
);
