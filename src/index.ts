#!/usr/bin/env node

import { Command } from "commander";
import chalk from "chalk";
import { createCommand } from "./commands/create.command";

// I create the main CLI program here.
// This is the command users will run from their terminal.
const program = new Command();

program
  .name("backend-forge")
  .description("Generate production-ready backend systems from your terminal.")
  .version("1.0.0");

// I register the create command here.
// Example: backend-forge create my-api
program.addCommand(createCommand);

// I tell commander to read the command the user typed.
program.parse(process.argv);

// If the user runs only `backend-forge`, I show a helpful message.
if (!process.argv.slice(2).length) {
  console.log(chalk.green("Welcome to Backend Forge"));
  console.log(chalk.gray("Run: backend-forge create my-api"));
}