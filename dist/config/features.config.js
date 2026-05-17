"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.featureConfigs = void 0;
exports.featureConfigs = {
    mongodb: {
        key: "mongodb",
        label: "MongoDB",
        templateFolder: "mongodb",
        packageDependencies: {
            mongoose: "^8.15.1",
        },
    },
    redis: {
        key: "redis",
        label: "Redis",
        templateFolder: "redis",
        packageDependencies: {
            redis: "^5.1.0",
        },
    },
    bullmq: {
        key: "bullmq",
        label: "BullMQ",
        templateFolder: "bullmq",
        dependencies: ["redis"],
        packageDependencies: {
            bullmq: "^5.53.2",
        },
    },
    socketio: {
        key: "socketio",
        label: "Socket.IO",
        templateFolder: "socketio",
        packageDependencies: {
            "socket.io": "^4.8.1",
        },
    },
    jwtAuth: {
        key: "jwtAuth",
        label: "JWT Authentication",
        templateFolder: "jwt-auth",
        packageDependencies: {
            jsonwebtoken: "^9.0.2",
        },
        packageDevDependencies: {
            "@types/jsonwebtoken": "^9.0.10",
        },
    },
    docker: {
        key: "docker",
        label: "Docker",
        templateFolder: "docker",
    },
};
