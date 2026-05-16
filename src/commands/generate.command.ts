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
    .action(async (moduleName: string) => {
        try {
            console.log(chalk.cyan(`Generating module: ${moduleName}`));

            await generateModule(moduleName);

            console.log(chalk.green("Module generated successfully."));
            console.log("");
            console.log(chalk.yellow("Generated module:"));
            console.log(`src/modules/${moduleName}/`);
            console.log("");
            console.log(chalk.cyan("Route registered automatically."));
        } catch (error) {
            console.error(chalk.red("Failed to generate module"));

            if (error instanceof Error) {
                console.error(chalk.red(error.message));
            }
        }
    });