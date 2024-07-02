const mariadb = require("mysql2");

const connection = mariadb.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "SmartDay",
  dateStrings: true,
});

module.exports = connection;
