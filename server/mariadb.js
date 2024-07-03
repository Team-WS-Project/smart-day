const mariadb = require("mysql2");

const connection = mariadb.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.MARIADB_PASWORD,
  database: process.env.DATABASE,
  dateStrings: true,
});

module.exports = connection;
