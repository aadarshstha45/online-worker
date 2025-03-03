import { config } from "dotenv";

config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});

export const {
  PORT,
  MONGO_URI,
  SECRET_KEY,
  CLOUD_NAME,
  API_KEY,
  API_SECRET,
  JWT_SECRET,
  JWT_EXPIRES_IN,
} = process.env;
