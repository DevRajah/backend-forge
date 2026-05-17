import forgePackageJson from "../../package.json";
import { ProjectOptions } from "../types/project-options";
import { featureConfigs } from "../config/features.config";
import {
  getSelectedFeatures,
  resolveFeatureDependencies,
} from "../config/feature-resolver";

// I keep dependency changes here so the main generator stays clean.
export const applyPackageFeatures = (
  packageJson: any,
  options: ProjectOptions
) => {
  packageJson.name = options.projectName;

  packageJson.generatedBy = "@michealadekunle/backend-forge";
  packageJson.generatorVersion = forgePackageJson.version;

  packageJson.dependencies = packageJson.dependencies || {};
  packageJson.devDependencies = packageJson.devDependencies || {};

  const selectedFeatures = getSelectedFeatures(options);
  const resolvedFeatures = resolveFeatureDependencies(selectedFeatures);

  for (const feature of resolvedFeatures) {
    const config = featureConfigs[feature];

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