"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyPackageFeatures = void 0;
const package_json_1 = __importDefault(require("../../package.json"));
// I keep dependency changes here so the main generator does not become messy.
const applyPackageFeatures = (packageJson, options) => {
    packageJson.name = options.projectName;
    packageJson.generatedBy =
        "@michealadekunle/backend-forge";
    packageJson.generatorVersion =
        package_json_1.default.version;
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
exports.applyPackageFeatures = applyPackageFeatures;
