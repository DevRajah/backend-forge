import { ProjectOptions } from "../types/project-options";

// I build server.ts dynamically so selected features are wired automatically.
export const buildServerFile = (options: ProjectOptions) => {
  const imports: string[] = [
    `import dotenv from "dotenv";`,
    `import http from "http";`,
    ``,
    `import app from "./app";`,
    `import { env } from "./config/env";`,
  ];

  const bootstrapSteps: string[] = [];

  if (options.useMongoDB) {
    imports.push(`import { connectDatabase } from "./config/database";`);
    bootstrapSteps.push(`  await connectDatabase();`);
  }

  if (options.useRedis) {
    imports.push(`import { connectRedis } from "./config/redis";`);
    bootstrapSteps.push(`  await connectRedis();`);
  }

  if (options.useSocketIO) {
    imports.push(`import { initializeSocket } from "./sockets/socket";`);
  }

  let serverCreation = `  const server = http.createServer(app);`;

  let socketSetup = "";

  if (options.useSocketIO) {
    socketSetup = `
  initializeSocket(server);`;
  }

  const bootstrapBody =
    bootstrapSteps.length > 0
      ? bootstrapSteps.join("\n") + "\n\n"
      : "";

  return `${imports.join("\n")}

dotenv.config();

// I use a bootstrap function so async startup tasks like database or Redis connection can run before the server starts.
const bootstrap = async () => {
${bootstrapBody}${serverCreation}${socketSetup}

  server.listen(env.port, () => {
    console.log(\`Server running on port \${env.port}\`);
  });
};

bootstrap().catch((error) => {
  console.error("Failed to start server");

  if (error instanceof Error) {
    console.error(error.message);
  }

  process.exit(1);
});
`;
};