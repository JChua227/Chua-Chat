const mysql = require("mysql2");
require("dotenv").config();

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "chuachat",
  password: process.env.dbPassword,
});

module.exports = connection;