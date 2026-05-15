import dotenv from "dotenv";
import app from "./app";
import { env } from "./config/env";

// I load environment variables before starting the server.
dotenv.config();

// I start the backend server here.
app.listen(env.port, () => {
  console.log(`Server running on port ${env.port}`);
});