import app from "./app.js";
import { PORT } from "./config/env.js";
import { connection, sequelize } from "./db/connection.js";

const startServer = async () => {
  try {
    await connection();
    await sequelize.sync({ alter: true });
    app.listen(PORT, () => {
      console.log(`Server connected on port ${PORT} successfully`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

startServer();
