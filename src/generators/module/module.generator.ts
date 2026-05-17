import path from "path";
import fs from "fs-extra";

import { ModuleGeneratorOptions } from "../../types/module-options";
import { toKebabCase } from "../../utils/string.utils";
import {
  buildControllerFile,
  buildCrudControllerFile,
  buildCrudRoutesFile,
  buildCrudServiceFile,
  buildCrudTypesFile,
  buildRoutesFile,
  buildServiceFile,
  buildTypesFile,
  buildValidatorFile,
} from "../../builders/module/module-files.builder";
import { registerModuleRoute } from "../../builders/module/route-registrar.builder";
import { validateBackendForgeProject } from "../../utils/project-validator";

export const generateModule = async (
  moduleName: string,
  options?: ModuleGeneratorOptions
) => {
  await validateBackendForgeProject();

  const kebabName = toKebabCase(moduleName);

  const modulesRoot = path.join(process.cwd(), "src/modules");
  const modulePath = path.join(modulesRoot, kebabName);

  const moduleAlreadyExists = await fs.pathExists(modulePath);

  if (moduleAlreadyExists) {
    throw new Error(
      `A module named "${kebabName}" already exists at:\n${modulePath}`
    );
  }

  await fs.ensureDir(modulePath);

  await fs.writeFile(
    path.join(modulePath, `${kebabName}.controller.ts`),
    options?.crud
      ? buildCrudControllerFile(moduleName)
      : buildControllerFile(moduleName)
  );

  await fs.writeFile(
    path.join(modulePath, `${kebabName}.service.ts`),
    options?.crud
      ? buildCrudServiceFile(moduleName)
      : buildServiceFile(moduleName)
  );

  await fs.writeFile(
    path.join(modulePath, `${kebabName}.routes.ts`),
    options?.crud ? buildCrudRoutesFile(moduleName) : buildRoutesFile(moduleName)
  );

  await fs.writeFile(
    path.join(modulePath, `${kebabName}.types.ts`),
    options?.crud ? buildCrudTypesFile(moduleName) : buildTypesFile(moduleName)
  ); 

  await fs.writeFile(
    path.join(modulePath, `${kebabName}.validator.ts`),
    buildValidatorFile(moduleName)
  );

  await registerModuleRoute(moduleName);
};