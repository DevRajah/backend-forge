import { Command } from "commander";
import chalk from "chalk";

import { generateModule } from "../generators/module/module.generator";

export const generateCommand = new Command("generate")
  .alias("g")
  .description("Generate backend resources inside an existing project");

generateCommand
  .command("module")
  .alias("m")
  .description("Generate a modular backend feature")
  .argument("<module-name>", "Name of the module to generate")
  .option("--crud", "Generate full CRUD endpoints")
  .addHelpText(
    "after",
    `
Examples:
  backend-forge generate module users
  backend-forge generate module products --crud
  backend-forge g m payments

Generated files:
  - controller
  - service
  - routes
  - validator
  - types

The module route is automatically registered inside:
  src/routes/index.ts
`
  )
  .action(async (moduleName: string, options: { crud?: boolean }) => {
    try {
      console.log(chalk.cyan(`Generating module: ${moduleName}`));

      await generateModule(moduleName, {
        crud: options.crud,
      });

      console.log(chalk.green("Module generated successfully."));
      console.log("");
      console.log(chalk.yellow("Generated module:"));
      console.log(`src/modules/${moduleName}/`);

      if (options.crud) {
        console.log("");
        console.log(chalk.cyan("CRUD endpoints generated."));
      }

      console.log("");
      console.log(chalk.cyan("Route registered automatically."));
    } catch (error) {
      console.error(chalk.red("Failed to generate module"));

      if (error instanceof Error) {
        console.error(chalk.red(error.message));
      }
    }
  });