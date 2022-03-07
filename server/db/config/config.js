require("dotenv").config();

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;
const db = {
  development: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST || "localhost",
    port: DB_PORT || 5432,
    dialect: "postgres",
    dialectModule: null
  },
  test: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST || "localhost",
    port: DB_PORT || 5432,
    dialect: "postgres"
  },
  production: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST || "localhost",
    port: DB_PORT || 5432,
    dialect: "postgres"
  }
};

module.exports = db;
