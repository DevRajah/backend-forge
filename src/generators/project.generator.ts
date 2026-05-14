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

export const generateProject = async (
  answers: ProjectAnswers
) => {
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

  const baseTemplatePath = path.join(
    __dirname,
    "../../templates/base"
  );

  const projectAlreadyExists = await fs.pathExists(targetPath);

  if (projectAlreadyExists) {
    throw new Error(
      `A folder named "${projectName}" already exists.`
    );
  }

  // I copy the base backend architecture first.
  await fs.copy(baseTemplatePath, targetPath);

  // I update package.json dynamically depending on selected features.
  const packageJsonPath = path.join(targetPath, "package.json");

  const packageJson = await fs.readJson(packageJsonPath);

  packageJson.name = projectName;

  // MongoDB
  if (useMongoDB) {
    packageJson.dependencies["mongoose"] = "^8.15.1";
  }

  // Redis
  if (useRedis) {
    packageJson.dependencies["redis"] = "^5.1.0";
  }

  // BullMQ
  if (useBullMQ) {
    packageJson.dependencies["bullmq"] = "^5.53.2";
  }

  // Socket.IO
  if (useSocketIO) {
    packageJson.dependencies["socket.io"] = "^4.8.1";
  }

  // JWT Auth
  if (useJWTAuth) {
    packageJson.dependencies["jsonwebtoken"] = "^9.0.2";

    packageJson.devDependencies["@types/jsonwebtoken"] =
      "^9.0.10";
  }

  // Docker
  if (useDocker) {
    // I generate a basic Dockerfile.
    const dockerfileContent = `
FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "run", "dev"]
`;

    await fs.writeFile(
      path.join(targetPath, "Dockerfile"),
      dockerfileContent.trim()
    );
  }

  await fs.writeJson(packageJsonPath, packageJson, {
    spaces: 2,
  });
};