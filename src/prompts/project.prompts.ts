import inquirer from "inquirer";
import { ProjectOptions } from "../types/project-options";
import { PresetKey, presetConfigs } from "../config/presets.config";

// I keep all CLI questions here so command files stay clean.
export const askProjectQuestions = async (
  preset?: PresetKey
): Promise<ProjectOptions> => {
  const projectNameAnswer = await inquirer.prompt<Pick<ProjectOptions, "projectName">>([
    {
      type: "input",
      name: "projectName",
      message: "Project name:",
      validate: (input: string) => {
        if (!input.trim()) {
          return "Project name is required";
        }

        return true;
      },
    },
  ]);

  if (preset) {
    const presetConfig = presetConfigs[preset];

    if (!presetConfig) {
      throw new Error(
        `Unknown preset "${preset}". Available presets: minimal, realtime, fintech`
      );
    }

    console.log("");
    console.log(`Using ${presetConfig.label} preset.`);
    console.log(presetConfig.description);

    return {
      projectName: projectNameAnswer.projectName,
      ...presetConfig.options,
    };
  }

  const answers = await inquirer.prompt<Omit<ProjectOptions, "projectName">>([
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

    {
      type: "confirm",
      name: "useZod",
      message: "Use Zod Validation?",
      default: true,
    }
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