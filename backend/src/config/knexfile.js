import "dotenv/config";

export default {
  development: {
    client: "mysql2",
    connection: {
      host: process.env.HOST,
      user: process.env.USER,
      password: process.env.DB_PSWD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT,
    },
    migrations: {
      directory: "../migrations",
    },
    seeds: {
      directory: "../seeds",
    },
  },
};
