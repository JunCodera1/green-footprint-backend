export const appConfig = {
  port: process.env.DEV_APP_PORT || 3000,
  appName: process.env.APP_NAME || "greenFootprint",
  env: process.env.NODE_ENV || "development",
};
