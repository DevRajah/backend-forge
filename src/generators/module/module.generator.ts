import path from "path";
import fs from "fs-extra";

import { toKebabCase } from "../../utils/string.utils";
import {
  buildControllerFile,
  buildRoutesFile,
  buildServiceFile,
  buildTypesFile,
  buildValidatorFile,
} from "../../builders/module/module-files.builder";

export const generateModule = async (moduleName: string) => {
  const kebabName = toKebabCase(moduleName);

  const modulesRoot = path.join(process.cwd(), "src/modules");
  const modulePath = path.join(modulesRoot, kebabName);

  const moduleAlreadyExists = await fs.pathExists(modulePath);

  if (moduleAlreadyExists) {
    throw new Error(`Module "${kebabName}" already exists.`);
  }

  await fs.ensureDir(modulePath);

  await fs.writeFile(
    path.join(modulePath, `${kebabName}.controller.ts`),
    buildControllerFile(moduleName)
  );

  await fs.writeFile(
    path.join(modulePath, `${kebabName}.service.ts`),
    buildServiceFile(moduleName)
  );

  await fs.writeFile(
    path.join(modulePath, `${kebabName}.routes.ts`),
    buildRoutesFile(moduleName)
  );

  await fs.writeFile(
    path.join(modulePath, `${kebabName}.types.ts`),
    buildTypesFile(moduleName)
  );

  await fs.writeFile(
    path.join(modulePath, `${kebabName}.validator.ts`),
    buildValidatorFile(moduleName)
  );
};