import path from "path";
import fs from "fs-extra";

interface ProjectAnswers {
  projectName: string;
  useMongoDB: boolean;
  useRedis: boolean;
  useBullMQ: boolean;
  useSocketIO: boolean;
  useJWTAuth: boolean;
  useDocker: boolean;
}

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

export const generateProject = async (answers: ProjectAnswers) => {
  const {
    projectName,
    useMongoDB,
    useRedis,
    useBullMQ,
    useSocketIO,
    useJWTAuth,
    useDocker,
  } = answers;

  const targetPath = path.join(process.cwd(), projectName);

  const baseTemplatePath = path.join(__dirname, "../../templates/base");

  const projectAlreadyExists = await fs.pathExists(targetPath);

  if (projectAlreadyExists) {
    throw new Error(`A folder named "${projectName}" already exists.`);
  }

  await fs.copy(baseTemplatePath, targetPath);

  const packageJsonPath = path.join(targetPath, "package.json");
  const packageJson = await fs.readJson(packageJsonPath);

  packageJson.name = projectName;

  if (useMongoDB) {
    await copyFeature("mongodb", targetPath);
    packageJson.dependencies["mongoose"] = "^8.15.1";
  }

  if (useRedis) {
    await copyFeature("redis", targetPath);
    packageJson.dependencies["redis"] = "^5.1.0";
  }

  if (useBullMQ) {
    await copyFeature("bullmq", targetPath);
    packageJson.dependencies["bullmq"] = "^5.53.2";
  }

  if (useSocketIO) {
    await copyFeature("socketio", targetPath);
    packageJson.dependencies["socket.io"] = "^4.8.1";
  }

  if (useJWTAuth) {
    await copyFeature("jwt-auth", targetPath);
    packageJson.dependencies["jsonwebtoken"] = "^9.0.2";
    packageJson.devDependencies["@types/jsonwebtoken"] = "^9.0.10";
  }

  if (useDocker) {
    await copyFeature("docker", targetPath);
  }

  await fs.writeJson(packageJsonPath, packageJson, {
    spaces: 2,
  });

  await updateEnvExample(targetPath, answers);
};

const updateEnvExample = async (
  targetPath: string,
  answers: ProjectAnswers
) => {
  const envPath = path.join(targetPath, ".env.example");

  let envContent = `PORT=5000
NODE_ENV=development
`;

  if (answers.useMongoDB) {
    envContent += `
MONGO_URI=mongodb://localhost:27017/${answers.projectName}
`;
  }

  if (answers.useRedis || answers.useBullMQ) {
    envContent += `
REDIS_URL=redis://localhost:6379
`;
  }

  if (answers.useJWTAuth) {
    envContent += `
JWT_SECRET=replace-this-with-a-secure-secret
`;
  }

  await fs.writeFile(envPath, envContent.trim() + "\n");
};