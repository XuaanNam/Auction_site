const mysql = require('mysql');
const config = require('../config/db')

const connection = mysql.createConnection(config);

module.exports = connection;