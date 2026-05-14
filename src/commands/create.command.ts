import { Command } from "commander";
import chalk from "chalk";
import { generateProject } from "../generators/project.generator";

// This command handles: backend-forge create <project-name>
export const createCommand = new Command("create")
  .description("Create a new backend project")
  .argument("<project-name>", "Name of the backend project")
  .action(async (projectName: string) => {
    try {
      console.log(chalk.cyan(`Creating backend project: ${projectName}`));

      await generateProject(projectName);

      console.log(chalk.green("Project created successfully!"));
      console.log("");
      console.log(chalk.yellow("Next steps:"));
      console.log(`cd ${projectName}`);
      console.log("npm install");
      console.log("npm run dev");
    } catch (error) {
      console.error(chalk.red("Failed to create project"));

      if (error instanceof Error) {
        console.error(chalk.red(error.message));
      }
    }
  });