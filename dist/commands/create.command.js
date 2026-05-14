"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCommand = void 0;
const commander_1 = require("commander");
const chalk_1 = __importDefault(require("chalk"));
const project_prompts_1 = require("../prompts/project.prompts");
const project_generator_1 = require("../generators/project.generator");
exports.createCommand = new commander_1.Command("create")
    .description("Create a new backend project")
    .action(async () => {
    try {
        // I ask the user interactive setup questions here.
        const answers = await (0, project_prompts_1.askProjectQuestions)();
        console.log("");
        console.log(chalk_1.default.cyan("Generating backend project..."));
        console.log("");
        await (0, project_generator_1.generateProject)(answers);
        console.log("");
        console.log(chalk_1.default.green("Backend project created successfully."));
        console.log("");
        console.log(chalk_1.default.yellow("Next steps:"));
        console.log(`cd ${answers.projectName}`);
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
