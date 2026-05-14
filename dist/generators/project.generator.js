"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateProject = void 0;
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const generateProject = async (answers) => {
    const { projectName, useMongoDB, useRedis, useBullMQ, useSocketIO, useJWTAuth, useDocker, } = answers;
    const targetPath = path_1.default.join(process.cwd(), projectName);
    const baseTemplatePath = path_1.default.join(__dirname, "../../templates/base");
    const projectAlreadyExists = await fs_extra_1.default.pathExists(targetPath);
    if (projectAlreadyExists) {
        throw new Error(`A folder named "${projectName}" already exists.`);
    }
    // I copy the base backend architecture first.
    await fs_extra_1.default.copy(baseTemplatePath, targetPath);
    // I update package.json dynamically depending on selected features.
    const packageJsonPath = path_1.default.join(targetPath, "package.json");
    const packageJson = await fs_extra_1.default.readJson(packageJsonPath);
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
        await fs_extra_1.default.writeFile(path_1.default.join(targetPath, "Dockerfile"), dockerfileContent.trim());
    }
    await fs_extra_1.default.writeJson(packageJsonPath, packageJson, {
        spaces: 2,
    });
};
exports.generateProject = generateProject;
