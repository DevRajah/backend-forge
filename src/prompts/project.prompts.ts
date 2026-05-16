import inquirer from "inquirer";
import { ProjectOptions } from "../types/project-options";

// I keep all CLI questions here so command files stay clean.
export const askProjectQuestions = async (): Promise<ProjectOptions> => {
  const answers = await inquirer.prompt<ProjectOptions>([
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

  // I force Redis on when BullMQ is selected because BullMQ needs Redis to work.
 if (answers.useBullMQ && !answers.useRedis) {
  console.log("");
  console.log(
    "BullMQ requires Redis. Redis has been automatically enabled."
  );

  answers.useRedis = true;
}

  return answers;
};