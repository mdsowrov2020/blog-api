import { Sequelize } from "sequelize";
import { DB_NAME, DB_PASSWORD, DB_USER, HOST } from "../config/env.js";

const sequelize = new Sequelize(
  DB_NAME || "blog",
  DB_USER || "postgres",
  DB_PASSWORD || "password",
  {
    host: HOST || "localhost",
    dialect: "postgres",
    logging: false,
  }
);

const connection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully.");
    return sequelize;
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    throw error;
  }
};

export { connection, sequelize };
