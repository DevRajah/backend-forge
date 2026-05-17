"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyPackageFeatures = void 0;
const package_json_1 = __importDefault(require("../../package.json"));
const features_config_1 = require("../config/features.config");
const feature_resolver_1 = require("../config/feature-resolver");
// I keep dependency changes here so the main generator stays clean.
const applyPackageFeatures = (packageJson, options) => {
    packageJson.name = options.projectName;
    packageJson.generatedBy = "@michealadekunle/backend-forge";
    packageJson.generatorVersion = package_json_1.default.version;
    packageJson.dependencies = packageJson.dependencies || {};
    packageJson.devDependencies = packageJson.devDependencies || {};
    const selectedFeatures = (0, feature_resolver_1.getSelectedFeatures)(options);
    const resolvedFeatures = (0, feature_resolver_1.resolveFeatureDependencies)(selectedFeatures);
    for (const feature of resolvedFeatures) {
        const config = features_config_1.featureConfigs[feature];
        if (config.packageDependencies) {
            packageJson.dependencies = {
                ...packageJson.dependencies,
                ...config.packageDependencies,
            };
        }
        if (config.packageDevDependencies) {
            packageJson.devDependencies = {
                ...packageJson.devDependencies,
                ...config.packageDevDependencies,
            };
        }
    }
    return packageJson;
};
exports.applyPackageFeatures = applyPackageFeatures;
