"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.askProjectQuestions = void 0;
const inquirer_1 = __importDefault(require("inquirer"));
const presets_config_1 = require("../config/presets.config");
// I keep all CLI questions here so command files stay clean.
const askProjectQuestions = async (preset) => {
    const projectNameAnswer = await inquirer_1.default.prompt([
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
    ]);
    if (preset) {
        const presetConfig = presets_config_1.presetConfigs[preset];
        if (!presetConfig) {
            throw new Error(`Unknown preset "${preset}". Available presets: minimal, realtime, fintech`);
        }
        console.log("");
        console.log(`Using ${presetConfig.label} preset.`);
        console.log(presetConfig.description);
        return {
            projectName: projectNameAnswer.projectName,
            ...presetConfig.options,
        };
    }
    const answers = await inquirer_1.default.prompt([
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
        {
            type: "confirm",
            name: "useSwagger",
            message: "Use Swagger/OpenAPI docs?",
            default: true,
        },
    ]);
    if (answers.useBullMQ && !answers.useRedis) {
        console.log("");
        console.log("BullMQ requires Redis. Redis has been automatically enabled.");
        answers.useRedis = true;
    }
    return {
        projectName: projectNameAnswer.projectName,
        ...answers,
    };
};
exports.askProjectQuestions = askProjectQuestions;
