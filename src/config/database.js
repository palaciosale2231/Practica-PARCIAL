import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

/* conexion a la base de datos (aplicandole la manera que aprendimos al principio)

export const sequelize = new Sequelize("practica_PARCIAL", "root", "", {
  host: "localhost",
  dialect: "mysql",
});*/

//acá ya aplicando el dotenv

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
  }
);



// testear la conexion
export const startDB = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
    console.log("Conexion a la db esta lista");
  } catch (error) {
    console.error("No se pudo conectar a la db:", error);
  }
};