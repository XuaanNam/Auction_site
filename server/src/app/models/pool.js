const mysql = require('mysql');
const config = require('../config/db')

const pool = mysql.createPool(config);
pool.query('SELECT 2001 + 79 AS solution', function (error, results, fields) {
    if (error) throw error;
    console.log('Connect to MySql successfully with password: ', results[0].solution);
  });
  
module.exports = pool;