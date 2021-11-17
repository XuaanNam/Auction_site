const mysql = require('mysql');
const config = require('../config/db')

const pool = mysql.createPool(config);

  
module.exports = pool;