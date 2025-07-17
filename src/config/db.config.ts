export const dbConfig = {
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || "green_footprint",
    password: process.env.DB_PASS || "password",
    username: process.env.DB_USER || "postgres",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "postgres",
    logging: true,
  };
  