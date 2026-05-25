export type FeatureKey =
  | "mongodb"
  | "redis"
  | "bullmq"
  | "socketio"
  | "jwtAuth"
  | "docker"
  | "swagger"
  | "zod";

export interface FeatureConfig {
  key: FeatureKey;
  label: string;
  templateFolder: string;
  dependencies?: string[];
  packageDependencies?: Record<string, string>;
  packageDevDependencies?: Record<string, string>;
}

export const featureConfigs: Record<FeatureKey, FeatureConfig> = {
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

  swagger: {
  key: "swagger",
  label: "Swagger/OpenAPI",
  templateFolder: "swagger",
  packageDependencies: {
    "swagger-jsdoc": "^6.2.8",
    "swagger-ui-express": "^5.0.1"
  },

  packageDevDependencies: {
    "@types/swagger-jsdoc": "^6.0.4",
    "@types/swagger-ui-express": "^4.1.8"
  }
},

  zod: {
    key: "zod",
    label: "Zod Validation",
    templateFolder: "zod",
    packageDependencies: {
      zod: "^3.24.1",
    }
  }
};