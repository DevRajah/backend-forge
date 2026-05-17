import { ProjectOptions } from "../types/project-options";
import { FeatureKey, featureConfigs } from "./features.config";

// I convert CLI answers into a clean list of selected feature keys.
export const getSelectedFeatures = (options: ProjectOptions): FeatureKey[] => {
  const selectedFeatures: FeatureKey[] = [];

  if (options.useMongoDB) selectedFeatures.push("mongodb");
  if (options.useRedis) selectedFeatures.push("redis");
  if (options.useBullMQ) selectedFeatures.push("bullmq");
  if (options.useSocketIO) selectedFeatures.push("socketio");
  if (options.useJWTAuth) selectedFeatures.push("jwtAuth");
  if (options.useDocker) selectedFeatures.push("docker");

  return selectedFeatures;
};

// I automatically add required dependencies between features.
// Example: BullMQ requires Redis.
export const resolveFeatureDependencies = (
  selectedFeatures: FeatureKey[]
): FeatureKey[] => {
  const resolved = new Set<FeatureKey>(selectedFeatures);

  for (const feature of selectedFeatures) {
    const config = featureConfigs[feature];

    if (!config.dependencies) continue;

    for (const dependency of config.dependencies) {
      resolved.add(dependency as FeatureKey);
    }
  }

  return Array.from(resolved);
};