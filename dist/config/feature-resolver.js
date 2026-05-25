"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveFeatureDependencies = exports.getSelectedFeatures = void 0;
const features_config_1 = require("./features.config");
// I convert CLI answers into a clean list of selected feature keys.
const getSelectedFeatures = (options) => {
    const selectedFeatures = [];
    if (options.useMongoDB)
        selectedFeatures.push("mongodb");
    if (options.useRedis)
        selectedFeatures.push("redis");
    if (options.useBullMQ)
        selectedFeatures.push("bullmq");
    if (options.useSocketIO)
        selectedFeatures.push("socketio");
    if (options.useJWTAuth)
        selectedFeatures.push("jwtAuth");
    if (options.useDocker)
        selectedFeatures.push("docker");
    if (options.useSwagger)
        selectedFeatures.push("swagger");
    return selectedFeatures;
};
exports.getSelectedFeatures = getSelectedFeatures;
// I automatically add required dependencies between features.
// Example: BullMQ requires Redis.
const resolveFeatureDependencies = (selectedFeatures) => {
    const resolved = new Set(selectedFeatures);
    for (const feature of selectedFeatures) {
        const config = features_config_1.featureConfigs[feature];
        if (!config.dependencies)
            continue;
        for (const dependency of config.dependencies) {
            resolved.add(dependency);
        }
    }
    return Array.from(resolved);
};
exports.resolveFeatureDependencies = resolveFeatureDependencies;
