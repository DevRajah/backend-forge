"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateProject = void 0;
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const generateProject = async (projectName) => {
    const targetPath = path_1.default.join(process.cwd(), projectName);
    // I point directly to the root templates folder.
    const templatePath = path_1.default.join(__dirname, "../../templates/express-ts");
    const projectAlreadyExists = await fs_extra_1.default.pathExists(targetPath);
    if (projectAlreadyExists) {
        throw new Error(`A folder named "${projectName}" already exists.`);
    }
    // I copy the full backend template into the new project.
    await fs_extra_1.default.copy(templatePath, targetPath);
    // I update the generated project's package name.
    const packageJsonPath = path_1.default.join(targetPath, "package.json");
    const packageJson = await fs_extra_1.default.readJson(packageJsonPath);
    packageJson.name = projectName;
    await fs_extra_1.default.writeJson(packageJsonPath, packageJson, { spaces: 2 });
};
exports.generateProject = generateProject;
