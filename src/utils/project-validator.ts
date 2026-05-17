import path from "path";
import fs from "fs-extra";

// I verify the current directory is a Backend Forge generated project before writing files.
export const validateBackendForgeProject = async () => {
  const currentPath = process.cwd();

  const packageJsonPath = path.join(currentPath, "package.json");
  const routesIndexPath = path.join(currentPath, "src/routes/index.ts");
  const modulesPath = path.join(currentPath, "src/modules");

  const packageJsonExists = await fs.pathExists(packageJsonPath);

  if (!packageJsonExists) {
    throw new Error(
      "No package.json found. Run this command inside a Backend Forge generated project."
    );
  }

  const packageJson = await fs.readJson(packageJsonPath);

  if (packageJson.generatedBy !== "@michealadekunle/backend-forge") {
    throw new Error(
      "This command must be run inside a Backend Forge generated project."
    );
  }

  const routesIndexExists = await fs.pathExists(routesIndexPath);

  if (!routesIndexExists) {
    throw new Error(
      "Could not find src/routes/index.ts. Run this command from the root of a Backend Forge generated project."
    );
  }

  await fs.ensureDir(modulesPath);
};
