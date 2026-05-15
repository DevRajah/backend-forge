import { ProjectOptions } from "../types/project-options";

// I keep dependency changes here so the main generator does not become messy.
export const applyPackageFeatures = (
  packageJson: any,
  options: ProjectOptions
) => {
  packageJson.name = options.projectName;

  packageJson.dependencies = packageJson.dependencies || {};
  packageJson.devDependencies = packageJson.devDependencies || {};

  if (options.useMongoDB) {
    packageJson.dependencies["mongoose"] = "^8.15.1";
  }

  if (options.useRedis) {
    packageJson.dependencies["redis"] = "^5.1.0";
  }

  if (options.useBullMQ) {
    packageJson.dependencies["bullmq"] = "^5.53.2";
  }

  if (options.useSocketIO) {
    packageJson.dependencies["socket.io"] = "^4.8.1";
  }

  if (options.useJWTAuth) {
    packageJson.dependencies["jsonwebtoken"] = "^9.0.2";
    packageJson.devDependencies["@types/jsonwebtoken"] = "^9.0.10";
  }

  return packageJson;
};