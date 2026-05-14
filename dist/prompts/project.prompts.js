"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.askProjectQuestions = void 0;
const inquirer_1 = __importDefault(require("inquirer"));
// I keep all CLI questions here so command files stay clean.
const askProjectQuestions = async () => {
    return inquirer_1.default.prompt([
        {
            type: "input",
            name: "projectName",
            message: "Project name:",
            validate: (input) => {
                if (!input.trim()) {
                    return "Project name is required";
                }
                return true;
            },
        },
        {
            type: "confirm",
            name: "useMongoDB",
            message: "Use MongoDB?",
            default: true,
        },
        {
            type: "confirm",
            name: "useRedis",
            message: "Use Redis?",
            default: false,
        },
        {
            type: "confirm",
            name: "useBullMQ",
            message: "Use BullMQ?",
            default: false,
        },
        {
            type: "confirm",
            name: "useSocketIO",
            message: "Use Socket.IO?",
            default: false,
        },
        {
            type: "confirm",
            name: "useJWTAuth",
            message: "Use JWT Authentication?",
            default: false,
        },
        {
            type: "confirm",
            name: "useDocker",
            message: "Use Docker?",
            default: false,
        },
    ]);
};
exports.askProjectQuestions = askProjectQuestions;
