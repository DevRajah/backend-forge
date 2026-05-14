import path from "path";
import fs from "fs-extra";

export const generateProject = async (projectName: string) => {
  const targetPath = path.join(process.cwd(), projectName);

  // I point directly to the root templates folder.
  const templatePath = path.join(__dirname, "../../templates/express-ts");

  const projectAlreadyExists = await fs.pathExists(targetPath);

  if (projectAlreadyExists) {
    throw new Error(`A folder named "${projectName}" already exists.`);
  }

  // I copy the full backend template into the new project.
  await fs.copy(templatePath, targetPath);

  // I update the generated project's package name.
  const packageJsonPath = path.join(targetPath, "package.json");
  const packageJson = await fs.readJson(packageJsonPath);

  packageJson.name = projectName;

  await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
};