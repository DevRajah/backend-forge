import { toCamelCase, toKebabCase, toPascalCase } from "../../utils/string.utils";

export const buildControllerFile = (moduleName: string) => {
  const kebabName = toKebabCase(moduleName);
  const camelName = toCamelCase(moduleName);
  const pascalName = toPascalCase(moduleName);

  return `import { Request, Response } from "express";
import * as ${camelName}Service from "./${kebabName}.service";

// I keep controller logic focused on HTTP request and response handling.
export const getAll${pascalName} = async (req: Request, res: Response) => {
  const data = await ${camelName}Service.findAll${pascalName}();

  res.status(200).json({
    success: true,
    message: "${pascalName} fetched successfully",
    data,
  });
};

// I keep this controller ready for creating new ${kebabName} records later.
export const create${pascalName} = async (req: Request, res: Response) => {
  const data = await ${camelName}Service.create${pascalName}(req.body);

  res.status(201).json({
    success: true,
    message: "${pascalName} created successfully",
    data,
  });
};
`;
};

export const buildServiceFile = (moduleName: string) => {
  const pascalName = toPascalCase(moduleName);

  return `// I keep business logic in the service layer so controllers stay clean.

export const findAll${pascalName} = async () => {
  // I return an empty array for now so the generated module works immediately.
  // Later, I can replace this with database logic.
  return [];
};

export const create${pascalName} = async (payload: unknown) => {
  // I return the payload for now so the endpoint can be tested immediately.
  // Later, I can validate and save this data to the database.
  return payload;
};
`;
};

export const buildRoutesFile = (moduleName: string) => {
  const kebabName = toKebabCase(moduleName);
  const pascalName = toPascalCase(moduleName);

  return `import { Router } from "express";
import {
  create${pascalName},
  getAll${pascalName},
} from "./${kebabName}.controller";

const router = Router();

// I expose GET / so I can list ${kebabName} records.
router.get("/", getAll${pascalName});

// I expose POST / so I can create a new ${kebabName} record.
router.post("/", create${pascalName});

export default router;
`;
};

export const buildTypesFile = (moduleName: string) => {
  const pascalName = toPascalCase(moduleName);

  return `// I keep ${pascalName}-specific TypeScript types here.

export interface Create${pascalName}Input {
  name?: string;
}
`;
};

export const buildValidatorFile = (moduleName: string) => {
  const pascalName = toPascalCase(moduleName);

  return `// I keep validation logic here so invalid data is rejected before reaching the service layer.

export const validateCreate${pascalName} = (payload: unknown) => {
  // Add Joi/Zod validation later if this module needs strict request validation.
  return payload;
};
`;
};