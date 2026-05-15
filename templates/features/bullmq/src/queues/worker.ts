import { Worker } from "bullmq";

// I keep the worker separate so background jobs can be processed outside the request/response cycle.
export const defaultWorker = new Worker(
  "default-queue",
  async (job) => {
    console.log(`Processing job ${job.id} with name ${job.name}`);

    return {
      success: true,
      processedAt: new Date().toISOString(),
    };
  },
  {
    connection: {
      url: process.env.REDIS_URL || "redis://localhost:6379",
    },
  }
);

defaultWorker.on("completed", (job) => {
  console.log(`Job ${job.id} completed successfully`);
});

defaultWorker.on("failed", (job, error) => {
  console.error(`Job ${job?.id} failed`, error);
});