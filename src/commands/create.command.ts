import { Command } from "commander";
import chalk from "chalk";

import { askProjectQuestions } from "../prompts/project.prompts";
import { generateProject } from "../generators/project.generator";

export const createCommand = new Command("create")
  .description("Create a new backend project")
  .action(async () => {
    try {
      // I ask the user interactive setup questions here.
      const answers = await askProjectQuestions();

      console.log("");
      console.log(chalk.cyan("Generating backend project..."));
      console.log("");

      await generateProject(answers);

      console.log("");
      console.log(chalk.green("Backend project created successfully."));
      console.log("");

      console.log(chalk.yellow("Next steps:"));
      console.log(`cd ${answers.projectName}`);
      console.log("npm install");
      console.log("npm run dev");
    } catch (error) {
      console.error(chalk.red("Failed to create project"));

      if (error instanceof Error) {
        console.error(chalk.red(error.message));
      }
    }
  });