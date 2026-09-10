import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { UserModel } from "./user.model.js";
import { PersonModel } from "./person.model.js";
import { RoleModel } from "./role.model.js";
import { UserRoleModel } from "./user_role.model.js";

//relacion 1a1

//un usuario pertenece a una persona.
UserModel.belongsTo(PersonModel, { foreignKey: "person_id", as: "owner" });

// una persona puede tener un usuario
PersonModel.hasOne(UserModel, { foreignKey: "person_id", as: "user " });

PersonModel.hasMany(RoleModel, { foreignKey: "rol_id", as: "rol" });

//relacion mucho a muchos
UserModel.belongsToMany(RoleModel, {
  thorough: UserRoleModel,
  foreignKey: "user_id",
  as: "roles ",
});

UserModel.belongsToMany(UserModel, {
  thorough: UserRoleModel,
  foreignKey: "role_id",
  as: "users",
});
