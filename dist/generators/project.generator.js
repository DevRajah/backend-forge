"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateProject = void 0;
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const copyFeature = async (featureName, targetPath) => {
    const featurePath = path_1.default.join(__dirname, "../../templates/features", featureName);
    const featureExists = await fs_extra_1.default.pathExists(featurePath);
    if (!featureExists) {
        console.log(`Feature not found: ${featurePath}`);
        return;
    }
    console.log(`Copying feature: ${featureName}`);
    await fs_extra_1.default.copy(featurePath, targetPath, {
        overwrite: true,
    });
};
const generateProject = async (answers) => {
    const { projectName, useMongoDB, useRedis, useBullMQ, useSocketIO, useJWTAuth, useDocker, } = answers;
    const targetPath = path_1.default.join(process.cwd(), projectName);
    const baseTemplatePath = path_1.default.join(__dirname, "../../templates/base");
    const projectAlreadyExists = await fs_extra_1.default.pathExists(targetPath);
    if (projectAlreadyExists) {
        throw new Error(`A folder named "${projectName}" already exists.`);
    }
    await fs_extra_1.default.copy(baseTemplatePath, targetPath);
    const packageJsonPath = path_1.default.join(targetPath, "package.json");
    const packageJson = await fs_extra_1.default.readJson(packageJsonPath);
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
    await fs_extra_1.default.writeJson(packageJsonPath, packageJson, {
        spaces: 2,
    });
    await updateEnvExample(targetPath, answers);
};
exports.generateProject = generateProject;
const updateEnvExample = async (targetPath, answers) => {
    const envPath = path_1.default.join(targetPath, ".env.example");
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
    await fs_extra_1.default.writeFile(envPath, envContent.trim() + "\n");
};
