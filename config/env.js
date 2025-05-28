import { config } from "dotenv";
config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

export const { PORT, NODE_ENV, DB_NAME, DB_USER, DB_PASSWORD, HOST } =
  process.env;
