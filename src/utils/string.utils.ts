// I keep naming helpers here so generated files use consistent naming everywhere.

export const toKebabCase = (value: string) => {
  return value
    .trim()
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();
};

export const toCamelCase = (value: string) => {
  const kebab = toKebabCase(value);

  return kebab.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
};

export const toPascalCase = (value: string) => {
  const camel = toCamelCase(value);

  return camel.charAt(0).toUpperCase() + camel.slice(1);
};