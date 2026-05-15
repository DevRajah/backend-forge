"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateProject = void 0;
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const server_builder_1 = require("../builders/server.builder");
const env_builder_1 = require("../builders/env.builder");
const package_builder_1 = require("../builders/package.builder");
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
const generateProject = async (options) => {
    const targetPath = path_1.default.join(process.cwd(), options.projectName);
    const baseTemplatePath = path_1.default.join(__dirname, "../../templates/base");
    const projectAlreadyExists = await fs_extra_1.default.pathExists(targetPath);
    if (projectAlreadyExists) {
        throw new Error(`A folder named "${options.projectName}" already exists.`);
    }
    // I copy the base backend architecture first.
    await fs_extra_1.default.copy(baseTemplatePath, targetPath);
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
    const packageJsonPath = path_1.default.join(targetPath, "package.json");
    const packageJson = await fs_extra_1.default.readJson(packageJsonPath);
    const updatedPackageJson = (0, package_builder_1.applyPackageFeatures)(packageJson, options);
    await fs_extra_1.default.writeJson(packageJsonPath, updatedPackageJson, {
        spaces: 2,
    });
    const envContent = (0, env_builder_1.buildEnvExample)(options);
    // I generate .env.example so developers know required variables.
    await fs_extra_1.default.writeFile(path_1.default.join(targetPath, ".env.example"), envContent);
    // I also generate a working .env automatically for immediate startup.
    await fs_extra_1.default.writeFile(path_1.default.join(targetPath, ".env"), envContent);
    // I generate server.ts dynamically so selected features are wired automatically.
    await fs_extra_1.default.writeFile(path_1.default.join(targetPath, "src/server.ts"), (0, server_builder_1.buildServerFile)(options));
};
exports.generateProject = generateProject;
