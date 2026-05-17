"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBackendForgeProject = void 0;
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
// I verify the current directory is a Backend Forge generated project before writing files.
const validateBackendForgeProject = async () => {
    const currentPath = process.cwd();
    const packageJsonPath = path_1.default.join(currentPath, "package.json");
    const routesIndexPath = path_1.default.join(currentPath, "src/routes/index.ts");
    const modulesPath = path_1.default.join(currentPath, "src/modules");
    const packageJsonExists = await fs_extra_1.default.pathExists(packageJsonPath);
    if (!packageJsonExists) {
        throw new Error("No package.json found. Run this command inside a Backend Forge generated project.");
    }
    const packageJson = await fs_extra_1.default.readJson(packageJsonPath);
    if (packageJson.generatedBy !== "@michealadekunle/backend-forge") {
        throw new Error("This command must be run inside a Backend Forge generated project.");
    }
    const routesIndexExists = await fs_extra_1.default.pathExists(routesIndexPath);
    if (!routesIndexExists) {
        throw new Error("Could not find src/routes/index.ts. Run this command from the root of a Backend Forge generated project.");
    }
    await fs_extra_1.default.ensureDir(modulesPath);
};
exports.validateBackendForgeProject = validateBackendForgeProject;
