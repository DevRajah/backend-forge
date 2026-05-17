"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateModule = void 0;
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const string_utils_1 = require("../../utils/string.utils");
const module_files_builder_1 = require("../../builders/module/module-files.builder");
const route_registrar_builder_1 = require("../../builders/module/route-registrar.builder");
const project_validator_1 = require("../../utils/project-validator");
const generateModule = async (moduleName) => {
    await (0, project_validator_1.validateBackendForgeProject)();
    const kebabName = (0, string_utils_1.toKebabCase)(moduleName);
    const modulesRoot = path_1.default.join(process.cwd(), "src/modules");
    const modulePath = path_1.default.join(modulesRoot, kebabName);
    const moduleAlreadyExists = await fs_extra_1.default.pathExists(modulePath);
    if (moduleAlreadyExists) {
        throw new Error(`A module named "${kebabName}" already exists at:\n${modulePath}`);
    }
    await fs_extra_1.default.ensureDir(modulePath);
    await fs_extra_1.default.writeFile(path_1.default.join(modulePath, `${kebabName}.controller.ts`), (0, module_files_builder_1.buildControllerFile)(moduleName));
    await fs_extra_1.default.writeFile(path_1.default.join(modulePath, `${kebabName}.service.ts`), (0, module_files_builder_1.buildServiceFile)(moduleName));
    await fs_extra_1.default.writeFile(path_1.default.join(modulePath, `${kebabName}.routes.ts`), (0, module_files_builder_1.buildRoutesFile)(moduleName));
    await fs_extra_1.default.writeFile(path_1.default.join(modulePath, `${kebabName}.types.ts`), (0, module_files_builder_1.buildTypesFile)(moduleName));
    await fs_extra_1.default.writeFile(path_1.default.join(modulePath, `${kebabName}.validator.ts`), (0, module_files_builder_1.buildValidatorFile)(moduleName));
    await (0, route_registrar_builder_1.registerModuleRoute)(moduleName);
};
exports.generateModule = generateModule;
