const mysql = require("mysql2");

const db = mysql.createPool({
  host: process.env.MEDIR_DB_HOST || 'localhost',
  user: process.env.MEDIR_DB_USER || 'root',
  password: process.env.MEDIR_DB_PASS || '',
  database: process.env.MEDIR_DB_NAME || 'medir',
  connectionLimit: 10
});

module.exports = db;
