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

export const buildCrudControllerFile = (moduleName: string) => {
  const kebabName = toKebabCase(moduleName);
  const pascalName = toPascalCase(moduleName);
  const camelName = toCamelCase(moduleName);

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

export const get${pascalName}ById = async (req: Request, res: Response) => {
  const data = await ${camelName}Service.find${pascalName}ById(req.params.id);

  res.status(200).json({
    success: true,
    message: "${pascalName} fetched successfully",
    data,
  });
};

export const create${pascalName} = async (req: Request, res: Response) => {
  const data = await ${camelName}Service.create${pascalName}(req.body);

  res.status(201).json({
    success: true,
    message: "${pascalName} created successfully",
    data,
  });
};

export const update${pascalName} = async (req: Request, res: Response) => {
  const data = await ${camelName}Service.update${pascalName}(req.params.id, req.body);

  res.status(200).json({
    success: true,
    message: "${pascalName} updated successfully",
    data,
  });
};

export const delete${pascalName} = async (req: Request, res: Response) => {
  await ${camelName}Service.delete${pascalName}(req.params.id);

  res.status(200).json({
    success: true,
    message: "${pascalName} deleted successfully",
  });
};
`;
};

export const buildCrudServiceFile = (moduleName: string) => {
  const pascalName = toPascalCase(moduleName);

  return `// I keep CRUD business logic in the service layer so controllers stay clean.

export const findAll${pascalName} = async () => {
  // Later, I can replace this with database query logic.
  return [];
};

export const find${pascalName}ById = async (id: string) => {
  // Later, I can replace this with database lookup logic.
  return {
    id,
  };
};

export const create${pascalName} = async (payload: unknown) => {
  // Later, I can validate and save this payload to the database.
  return payload;
};

export const update${pascalName} = async (id: string, payload: unknown) => {
  // Later, I can update the database record with this id.
  return {
    id,
    ...(payload as object),
  };
};

export const delete${pascalName} = async (id: string) => {
  // Later, I can delete the database record with this id.
  return {
    id,
  };
};
`;
};

export const buildCrudRoutesFile = (moduleName: string) => {
  const kebabName = toKebabCase(moduleName);
  const pascalName = toPascalCase(moduleName);

  return `import { Router } from "express";
import {
  create${pascalName},
  delete${pascalName},
  getAll${pascalName},
  get${pascalName}ById,
  update${pascalName},
} from "./${kebabName}.controller";

const router = Router();

router.get("/", getAll${pascalName});
router.get("/:id", get${pascalName}ById);
router.post("/", create${pascalName});
router.patch("/:id", update${pascalName});
router.delete("/:id", delete${pascalName});

export default router;
`;
};

export const buildCrudTypesFile = (moduleName: string) => {
  const pascalName = toPascalCase(moduleName);

  return `// I keep ${pascalName}-specific TypeScript types here.

export interface Create${pascalName}Input {
  name?: string;
}

export interface Update${pascalName}Input {
  name?: string;
}
`;
};