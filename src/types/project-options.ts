export interface ProjectOptions {
  projectName: string;
  useMongoDB: boolean;
  useRedis: boolean;
  useBullMQ: boolean;
  useSocketIO: boolean;
  useJWTAuth: boolean;
  useDocker: boolean;
  useSwagger: boolean;
}