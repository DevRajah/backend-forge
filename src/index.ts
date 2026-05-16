#!/usr/bin/env node

import { Command } from "commander";
import chalk from "chalk";
import { createCommand } from "./commands/create.command";
import { generateCommand } from "./commands/generate.command";

// I create the main CLI program here.
// This is the command users will run from their terminal.
const program = new Command();

program
  .name("backend-forge")
  .description("Generate production-ready backend systems from your terminal.")
  .version("1.2.0")
  .addHelpText(
  "after",
  `
Examples:
  backend-forge create
  backend-forge generate module users
  backend-forge g m payments

Documentation:
  https://github.com/DevRajah/backend-forge
`
);

// I register the create command here.
// Example: backend-forge create my-api
program.addCommand(createCommand);

// I register the generate command here.
// Example: backend-forge generate module my-module
program.addCommand(generateCommand);

// I tell commander to read the command the user typed.
program.parse(process.argv);

// If the user runs only `backend-forge`, I show a helpful message.
if (!process.argv.slice(2).length) {
  console.log(chalk.green("Welcome to Backend Forge"));
  console.log(chalk.gray("Run: backend-forge create"));
  console.log(chalk.gray("Run: backend-forge generate module users"));
}