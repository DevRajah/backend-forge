import { Queue } from "bullmq";

// I keep queue creation here so background jobs can be added from anywhere in the app.
export const defaultQueue = new Queue("default-queue", {
  connection: {
    url: process.env.REDIS_URL || "redis://localhost:6379",
  },
});