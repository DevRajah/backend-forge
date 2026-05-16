"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerModuleRoute = void 0;
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const string_utils_1 = require("../../utils/string.utils");
// I update src/routes/index.ts so generated modules are automatically mounted.
const registerModuleRoute = async (moduleName) => {
    const kebabName = (0, string_utils_1.toKebabCase)(moduleName);
    const camelName = (0, string_utils_1.toCamelCase)(moduleName);
    const routesIndexPath = path_1.default.join(process.cwd(), "src/routes/index.ts");
    const routesIndexExists = await fs_extra_1.default.pathExists(routesIndexPath);
    if (!routesIndexExists) {
        throw new Error("Could not find src/routes/index.ts. Run this command inside a Backend Forge generated project.");
    }
    let fileContent = await fs_extra_1.default.readFile(routesIndexPath, "utf-8");
    const importLine = `import ${camelName}Routes from "../modules/${kebabName}/${kebabName}.routes";`;
    const routeLine = `router.use("/${kebabName}", ${camelName}Routes);`;
    // I avoid adding the same import twice if the command runs again.
    if (!fileContent.includes(importLine)) {
        const lastImportMatch = [...fileContent.matchAll(/^import .+;$/gm)].pop();
        if (lastImportMatch) {
            const insertPosition = lastImportMatch.index + lastImportMatch[0].length;
            fileContent =
                fileContent.slice(0, insertPosition) +
                    `\n${importLine}` +
                    fileContent.slice(insertPosition);
        }
        else {
            fileContent = `${importLine}\n${fileContent}`;
        }
    }
    // I avoid adding the same route twice if the command runs again.
    if (!fileContent.includes(routeLine)) {
        const exportLine = "export default router;";
        const exportIndex = fileContent.indexOf(exportLine);
        if (exportIndex === -1) {
            throw new Error("Could not find export default router; in src/routes/index.ts");
        }
        fileContent =
            fileContent.slice(0, exportIndex) +
                `${routeLine}\n\n` +
                fileContent.slice(exportIndex);
    }
    await fs_extra_1.default.writeFile(routesIndexPath, fileContent);
};
exports.registerModuleRoute = registerModuleRoute;
