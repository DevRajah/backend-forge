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
const presets_config_1 = require("../config/presets.config");
exports.createCommand = new commander_1.Command("create")
    .description("Create a new backend project")
    .option("-p, --preset <preset>", "Use a preset architecture: minimal, realtime, fintech")
    .addHelpText("after", `
Examples:
  backend-forge create
  backend-forge create --preset minimal
  backend-forge create --preset realtime
  backend-forge create --preset fintech

Presets:
  minimal   Express + TypeScript base architecture only
  realtime  MongoDB + Redis + Socket.IO + JWT + Docker
  fintech   MongoDB + Redis + BullMQ + JWT + Docker
`)
    .action(async (commandOptions) => {
    try {
        const preset = commandOptions.preset;
        if (preset &&
            !["minimal", "realtime", "fintech"].includes(preset)) {
            throw new Error(`Unknown preset "${preset}". Available presets:\n- minimal\n- realtime\n- fintech`);
        }
        const answers = await (0, project_prompts_1.askProjectQuestions)(preset);
        console.log("");
        console.log(chalk_1.default.cyan("Generating backend project..."));
        console.log("");
        await (0, project_generator_1.generateProject)(answers);
        console.log("");
        console.log(chalk_1.default.green("Backend project created successfully."));
        console.log("");
        if (preset && presets_config_1.presetConfigs[preset]) {
            console.log(chalk_1.default.cyan(`Preset used: ${presets_config_1.presetConfigs[preset].label}`));
            console.log(chalk_1.default.gray(presets_config_1.presetConfigs[preset].description));
            console.log("");
        }
        console.log(chalk_1.default.yellow("Next steps:"));
        console.log(`cd ${answers.projectName}`);
        console.log("npm install");
        console.log("npm run dev");
        console.log("");
        console.log(chalk_1.default.cyan("Generated features:"));
        if (answers.useMongoDB)
            console.log("- MongoDB");
        if (answers.useRedis)
            console.log("- Redis");
        if (answers.useBullMQ)
            console.log("- BullMQ");
        if (answers.useSocketIO)
            console.log("- Socket.IO");
        if (answers.useJWTAuth)
            console.log("- JWT Authentication");
        if (answers.useDocker)
            console.log("- Docker");
        if (answers.useSwagger)
            console.log("- Swagger/OpenAPI");
        if (answers.useZod)
            console.log("- Zod Validation");
        if (!answers.useMongoDB &&
            !answers.useRedis &&
            !answers.useBullMQ &&
            !answers.useSocketIO &&
            !answers.useJWTAuth &&
            !answers.useDocker &&
            !answers.useSwagger &&
            !answers.useZod) {
            console.log("- Base Express + TypeScript architecture");
        }
    }
    catch (error) {
        console.error(chalk_1.default.red("Failed to create project"));
        if (error instanceof Error) {
            console.error(chalk_1.default.red(error.message));
        }
    }
});
