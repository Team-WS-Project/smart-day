const mariadb = require("mysql2");

const dotenv = require("dotenv");
dotenv.config();

const connection = mariadb.createConnection({
  host: process.env.HOST_NAME,
  port: process.env.MARIADB_PORT,
  user: process.env.MARIADB_ROOT,
  password: process.env.MARIADB_PASSWORD,
  database: process.env.DATABASE,
  dateStrings: true,
});

module.exports = connection;
