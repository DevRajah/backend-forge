import path from "path";
import fs from "fs-extra";

import { ProjectOptions } from "../types/project-options";
import { buildServerFile } from "../builders/server.builder";
import { buildEnvExample } from "../builders/env.builder";
import { applyPackageFeatures } from "../builders/package.builder";

const copyFeature = async (featureName: string, targetPath: string) => {
  const featurePath = path.join(
    __dirname,
    "../../templates/features",
    featureName
  );

  const featureExists = await fs.pathExists(featurePath);

  if (!featureExists) {
    console.log(`Feature not found: ${featurePath}`);
    return;
  }

  console.log(`Copying feature: ${featureName}`);

  await fs.copy(featurePath, targetPath, {
    overwrite: true,
  });
};

export const generateProject = async (options: ProjectOptions) => {
  const targetPath = path.join(process.cwd(), options.projectName);

  const baseTemplatePath = path.join(__dirname, "../../templates/base");

  const projectAlreadyExists = await fs.pathExists(targetPath);

  if (projectAlreadyExists) {
    throw new Error(`A folder named "${options.projectName}" already exists.`);
  }

  // I copy the base backend architecture first.
  await fs.copy(baseTemplatePath, targetPath);

  if (options.useMongoDB) {
    await copyFeature("mongodb", targetPath);
  }

  if (options.useRedis) {
    await copyFeature("redis", targetPath);
  }

  if (options.useBullMQ) {
    await copyFeature("bullmq", targetPath);
  }

  if (options.useSocketIO) {
    await copyFeature("socketio", targetPath);
  }

  if (options.useJWTAuth) {
    await copyFeature("jwt-auth", targetPath);
  }

  if (options.useDocker) {
    await copyFeature("docker", targetPath);
  }

  // I update package.json based on selected features.
  const packageJsonPath = path.join(targetPath, "package.json");
  const packageJson = await fs.readJson(packageJsonPath);
  const updatedPackageJson = applyPackageFeatures(packageJson, options);

  await fs.writeJson(packageJsonPath, updatedPackageJson, {
    spaces: 2,
  });

  const envContent = buildEnvExample(options);

// I generate .env.example so developers know required variables.
await fs.writeFile(
  path.join(targetPath, ".env.example"),
  envContent
);

// I also generate a working .env automatically for immediate startup.
await fs.writeFile(
  path.join(targetPath, ".env"),
  envContent
);

  // I generate server.ts dynamically so selected features are wired automatically.
  await fs.writeFile(
    path.join(targetPath, "src/server.ts"),
    buildServerFile(options)
  );
};