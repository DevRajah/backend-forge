"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCommand = void 0;
const commander_1 = require("commander");
const chalk_1 = __importDefault(require("chalk"));
const project_generator_1 = require("../generators/project.generator");
// This command handles: backend-forge create <project-name>
exports.createCommand = new commander_1.Command("create")
    .description("Create a new backend project")
    .argument("<project-name>", "Name of the backend project")
    .action(async (projectName) => {
    try {
        console.log(chalk_1.default.cyan(`Creating backend project: ${projectName}`));
        await (0, project_generator_1.generateProject)(projectName);
        console.log(chalk_1.default.green("Project created successfully!"));
        console.log("");
        console.log(chalk_1.default.yellow("Next steps:"));
        console.log(`cd ${projectName}`);
        console.log("npm install");
        console.log("npm run dev");
    }
    catch (error) {
        console.error(chalk_1.default.red("Failed to create project"));
        if (error instanceof Error) {
            console.error(chalk_1.default.red(error.message));
        }
    }
});
