"use strict";
// I keep naming helpers here so generated files use consistent naming everywhere.
Object.defineProperty(exports, "__esModule", { value: true });
exports.toPascalCase = exports.toCamelCase = exports.toKebabCase = void 0;
const toKebabCase = (value) => {
    return value
        .trim()
        .replace(/([a-z])([A-Z])/g, "$1-$2")
        .replace(/[\s_]+/g, "-")
        .toLowerCase();
};
exports.toKebabCase = toKebabCase;
const toCamelCase = (value) => {
    const kebab = (0, exports.toKebabCase)(value);
    return kebab.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
};
exports.toCamelCase = toCamelCase;
const toPascalCase = (value) => {
    const camel = (0, exports.toCamelCase)(value);
    return camel.charAt(0).toUpperCase() + camel.slice(1);
};
exports.toPascalCase = toPascalCase;
