const mysql = require("promise-mysql");

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'medir',
  connectionLimit: 10
});
