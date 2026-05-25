import dotenv from "dotenv";

// I load .env here so environment variables are ready before the app reads them.
dotenv.config();

export const env = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || "development",
};