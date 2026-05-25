"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.presetConfigs = void 0;
exports.presetConfigs = {
    minimal: {
        key: "minimal",
        label: "Minimal API",
        description: "Clean Express + TypeScript backend with core architecture only.",
        options: {
            useMongoDB: false,
            useRedis: false,
            useBullMQ: false,
            useSocketIO: false,
            useJWTAuth: false,
            useDocker: false,
            useSwagger: true,
            useZod: true,
        },
    },
    realtime: {
        key: "realtime",
        label: "Realtime System",
        description: "Backend setup for live updates, dashboards, chat, and socket-based apps.",
        options: {
            useMongoDB: true,
            useRedis: true,
            useBullMQ: false,
            useSocketIO: true,
            useJWTAuth: true,
            useDocker: true,
            useSwagger: true,
            useZod: true,
        },
    },
    fintech: {
        key: "fintech",
        label: "Fintech API",
        description: "Backend setup for payments, queues, authentication, and background processing.",
        options: {
            useMongoDB: true,
            useRedis: true,
            useBullMQ: true,
            useSocketIO: false,
            useJWTAuth: true,
            useDocker: true,
            useSwagger: true,
            useZod: true,
        },
    },
};
