// I keep environment variables in one place so the rest of the app does not touch process.env directly.
export const env = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || "development",
};