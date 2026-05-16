#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const chalk_1 = __importDefault(require("chalk"));
const create_command_1 = require("./commands/create.command");
const generate_command_1 = require("./commands/generate.command");
// I create the main CLI program here.
// This is the command users will run from their terminal.
const program = new commander_1.Command();
program
    .name("backend-forge")
    .description("Generate production-ready backend systems from your terminal.")
    .version("1.2.0")
    .addHelpText("after", `
Examples:
  backend-forge create
  backend-forge generate module users
  backend-forge g m payments

Documentation:
  https://github.com/DevRajah/backend-forge
`);
// I register the create command here.
// Example: backend-forge create my-api
program.addCommand(create_command_1.createCommand);
// I register the generate command here.
// Example: backend-forge generate module my-module
program.addCommand(generate_command_1.generateCommand);
// I tell commander to read the command the user typed.
program.parse(process.argv);
// If the user runs only `backend-forge`, I show a helpful message.
if (!process.argv.slice(2).length) {
    console.log(chalk_1.default.green("Welcome to Backend Forge"));
    console.log(chalk_1.default.gray("Run: backend-forge create"));
    console.log(chalk_1.default.gray("Run: backend-forge generate module users"));
}
