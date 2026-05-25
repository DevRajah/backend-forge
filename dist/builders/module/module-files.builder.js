"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildZodCrudValidatorFile = exports.buildCrudTypesFile = exports.buildCrudRoutesFile = exports.buildCrudServiceFile = exports.buildCrudControllerFile = exports.buildValidatorFile = exports.buildTypesFile = exports.buildRoutesFile = exports.buildServiceFile = exports.buildControllerFile = void 0;
const string_utils_1 = require("../../utils/string.utils");
const buildControllerFile = (moduleName) => {
    const kebabName = (0, string_utils_1.toKebabCase)(moduleName);
    const camelName = (0, string_utils_1.toCamelCase)(moduleName);
    const pascalName = (0, string_utils_1.toPascalCase)(moduleName);
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
exports.buildControllerFile = buildControllerFile;
const buildServiceFile = (moduleName) => {
    const pascalName = (0, string_utils_1.toPascalCase)(moduleName);
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
exports.buildServiceFile = buildServiceFile;
const buildRoutesFile = (moduleName) => {
    const kebabName = (0, string_utils_1.toKebabCase)(moduleName);
    const pascalName = (0, string_utils_1.toPascalCase)(moduleName);
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
exports.buildRoutesFile = buildRoutesFile;
const buildTypesFile = (moduleName) => {
    const pascalName = (0, string_utils_1.toPascalCase)(moduleName);
    return `// I keep ${pascalName}-specific TypeScript types here.

export interface Create${pascalName}Input {
  name?: string;
}
`;
};
exports.buildTypesFile = buildTypesFile;
const buildValidatorFile = (moduleName) => {
    const pascalName = (0, string_utils_1.toPascalCase)(moduleName);
    return `// I keep ${pascalName} validation logic here.
// Add Zod validation by creating the project with Zod enabled.

export const validateCreate${pascalName} = (payload: unknown) => {
  return payload;
};
`;
};
exports.buildValidatorFile = buildValidatorFile;
const buildCrudControllerFile = (moduleName) => {
    const kebabName = (0, string_utils_1.toKebabCase)(moduleName);
    const pascalName = (0, string_utils_1.toPascalCase)(moduleName);
    const camelName = (0, string_utils_1.toCamelCase)(moduleName);
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
exports.buildCrudControllerFile = buildCrudControllerFile;
const buildCrudServiceFile = (moduleName) => {
    const pascalName = (0, string_utils_1.toPascalCase)(moduleName);
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
exports.buildCrudServiceFile = buildCrudServiceFile;
const buildCrudRoutesFile = (moduleName, useZod) => {
    const kebabName = (0, string_utils_1.toKebabCase)(moduleName);
    const pascalName = (0, string_utils_1.toPascalCase)(moduleName);
    const validationImports = useZod
        ? `import { validateRequest } from "../../middlewares/validate.middleware";
import {
  create${pascalName}Schema,
  update${pascalName}Schema,
} from "./${kebabName}.validator";`
        : "";
    const createMiddleware = useZod
        ? `validateRequest(create${pascalName}Schema), `
        : "";
    const updateMiddleware = useZod
        ? `validateRequest(update${pascalName}Schema), `
        : "";
    return `import { Router } from "express";
import {
  create${pascalName},
  delete${pascalName},
  getAll${pascalName},
  get${pascalName}ById,
  update${pascalName},
} from "./${kebabName}.controller";
${validationImports}

const router = Router();

router.get("/", getAll${pascalName});
router.get("/:id", get${pascalName}ById);
router.post("/", ${createMiddleware}create${pascalName});
router.patch("/:id", ${updateMiddleware}update${pascalName});
router.delete("/:id", delete${pascalName});

export default router;
`;
};
exports.buildCrudRoutesFile = buildCrudRoutesFile;
const buildCrudTypesFile = (moduleName) => {
    const pascalName = (0, string_utils_1.toPascalCase)(moduleName);
    return `// I keep ${pascalName}-specific TypeScript types here.

export interface Create${pascalName}Input {
  name?: string;
}

export interface Update${pascalName}Input {
  name?: string;
}
`;
};
exports.buildCrudTypesFile = buildCrudTypesFile;
const buildZodCrudValidatorFile = (moduleName) => {
    const pascalName = (0, string_utils_1.toPascalCase)(moduleName);
    return `import { z } from "zod";

// I validate create requests before they reach the controller.
export const create${pascalName}Schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
});

// I validate update requests and allow partial updates.
export const update${pascalName}Schema = create${pascalName}Schema.partial();
`;
};
exports.buildZodCrudValidatorFile = buildZodCrudValidatorFile;
