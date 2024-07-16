require("dotenv").config();

module.exports = {
  development: {
    username: process.env.pg_user,
    password: process.env.pg_password,
    database: process.env.pg_database,
    host: process.env.pg_host,
    port: process.env.pg_port,
    dialect: "postgres",
    seederStorage: "json",
    migrationStorage: "json",
    migrationStoragePath: "sequelizeMigrate.json",
    seederStoragePath: "sequelizeSeed.json",
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  production: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql"
  }
}
