"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCommand = void 0;
const commander_1 = require("commander");
const chalk_1 = __importDefault(require("chalk"));
const module_generator_1 = require("../generators/module/module.generator");
exports.generateCommand = new commander_1.Command("generate")
    .alias("g")
    .description("Generate backend resources inside an existing project");
exports.generateCommand
    .command("module")
    .alias("m")
    .description("Generate a modular backend feature")
    .argument("<module-name>", "Name of the module to generate")
    .option("--crud", "Generate full CRUD endpoints")
    .addHelpText("after", `
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
`)
    .action(async (moduleName, options) => {
    try {
        console.log(chalk_1.default.cyan(`Generating module: ${moduleName}`));
        await (0, module_generator_1.generateModule)(moduleName, {
            crud: options.crud,
        });
        console.log(chalk_1.default.green("Module generated successfully."));
        console.log("");
        console.log(chalk_1.default.yellow("Generated module:"));
        console.log(`src/modules/${moduleName}/`);
        if (options.crud) {
            console.log("");
            console.log(chalk_1.default.cyan("CRUD endpoints generated."));
        }
        console.log("");
        console.log(chalk_1.default.cyan("Route registered automatically."));
    }
    catch (error) {
        console.error(chalk_1.default.red("Failed to generate module"));
        if (error instanceof Error) {
            console.error(chalk_1.default.red(error.message));
        }
    }
});
