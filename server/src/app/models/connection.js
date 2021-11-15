const mysql = require('mysql');
const config = require('../config/db');
const connection = mysql.createConnection(config);
connection.connect(function(err) {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId);
  });
  
module.exports = connection;