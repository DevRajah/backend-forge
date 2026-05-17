import http from "http";

import app from "./app";
import { env } from "./config/env";
import { connectDatabase } from "./config/database";
import { connectRedis } from "./config/redis";
import { initializeSocket } from "./sockets/socket";


// I use a bootstrap function so async startup tasks like database or Redis connection can run before the server starts.
const bootstrap = async () => {
  await connectDatabase();
  await connectRedis();

  const server = http.createServer(app);
  initializeSocket(server);

  server.listen(env.port, () => {
    console.log(`Server running on port ${env.port}`);
  });
};

bootstrap().catch((error) => {
  console.error("Failed to start server");

  if (error instanceof Error) {
    console.error(error.message);
  }

  process.exit(1);
});
