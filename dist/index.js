#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const chalk_1 = __importDefault(require("chalk"));
const create_command_1 = require("./commands/create.command");
// I create the main CLI program here.
// This is the command users will run from their terminal.
const program = new commander_1.Command();
program
    .name("backend-forge")
    .description("Generate production-ready backend systems from your terminal.")
    .version("1.0.0");
// I register the create command here.
// Example: backend-forge create my-api
program.addCommand(create_command_1.createCommand);
// I tell commander to read the command the user typed.
program.parse(process.argv);
// If the user runs only `backend-forge`, I show a helpful message.
if (!process.argv.slice(2).length) {
    console.log(chalk_1.default.green("Welcome to Backend Forge"));
    console.log(chalk_1.default.gray("Run: backend-forge create my-api"));
}
