import { ProjectOptions } from "../types/project-options";

// I generate the correct env example based on selected features.
export const buildEnvExample = (options: ProjectOptions) => {
  let envContent = `PORT=5000
NODE_ENV=development
`;

  if (options.useMongoDB) {
    envContent += `
MONGO_URI=mongodb://localhost:27017/${options.projectName}
`;
  }

  if (options.useRedis || options.useBullMQ) {
    envContent += `
REDIS_URL=redis://localhost:6379
`;
  }

  if (options.useJWTAuth) {
    envContent += `
JWT_SECRET=replace-this-with-a-secure-secret
`;
  }

  return envContent.trim() + "\n";
};