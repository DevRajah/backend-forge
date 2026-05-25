import { Command } from "commander";
import chalk from "chalk";

import { askProjectQuestions } from "../prompts/project.prompts";
import { generateProject } from "../generators/project.generator";
import { PresetKey, presetConfigs } from "../config/presets.config";

export const createCommand = new Command("create")
  .description("Create a new backend project")
  .option(
    "-p, --preset <preset>",
    "Use a preset architecture: minimal, realtime, fintech"
  )
  .addHelpText(
    "after",
    `
Examples:
  backend-forge create
  backend-forge create --preset minimal
  backend-forge create --preset realtime
  backend-forge create --preset fintech

Presets:
  minimal   Express + TypeScript base architecture only
  realtime  MongoDB + Redis + Socket.IO + JWT + Docker
  fintech   MongoDB + Redis + BullMQ + JWT + Docker
`
  )
  .action(async (commandOptions: { preset?: string }) => {
    try {
      const preset = commandOptions.preset as PresetKey | undefined;

      if (
        preset &&
        !["minimal", "realtime", "fintech"].includes(preset)
      ) {
        throw new Error(
          `Unknown preset "${preset}". Available presets:\n- minimal\n- realtime\n- fintech`
        );
      }

      const answers = await askProjectQuestions(preset);

      console.log("");
      console.log(chalk.cyan("Generating backend project..."));
      console.log("");

      await generateProject(answers);

      console.log("");
      console.log(chalk.green("Backend project created successfully."));
      console.log("");

      if (preset && presetConfigs[preset]) {
        console.log(chalk.cyan(`Preset used: ${presetConfigs[preset].label}`));
        console.log(chalk.gray(presetConfigs[preset].description));
        console.log("");
      }

      console.log(chalk.yellow("Next steps:"));
      console.log(`cd ${answers.projectName}`);
      console.log("npm install");
      console.log("npm run dev");

      console.log("");
      console.log(chalk.cyan("Generated features:"));

      if (answers.useMongoDB) console.log("- MongoDB");
      if (answers.useRedis) console.log("- Redis");
      if (answers.useBullMQ) console.log("- BullMQ");
      if (answers.useSocketIO) console.log("- Socket.IO");
      if (answers.useJWTAuth) console.log("- JWT Authentication");
      if (answers.useDocker) console.log("- Docker");
      if (answers.useSwagger) console.log("- Swagger/OpenAPI");

      if (
        !answers.useMongoDB &&
        !answers.useRedis &&
        !answers.useBullMQ &&
        !answers.useSocketIO &&
        !answers.useJWTAuth &&
        !answers.useDocker &&
        !answers.useSwagger
      ) {
        console.log("- Base Express + TypeScript architecture");
      }
    } catch (error) {
      console.error(chalk.red("Failed to create project"));

      if (error instanceof Error) {
        console.error(chalk.red(error.message));
      }
    }
  });