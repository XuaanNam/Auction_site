const mysql = require('mysql');
// const pool  = mysql.createPool({
//     host     : 'localhost',
//     user     : 'root',
//     password : 'nam123',
//     database : 'checked_db',
//     supportBigNumbers: true,
//     bigNumberStrings: true,
//     dateStrings: true,
//     multipleStatements: true,
// });
const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'nam123',
    database : 'auctiondata',
    supportBigNumbers: true,
    bigNumberStrings: true,
    dateStrings: true,
    multipleStatements: true,
});
//var connection = mysql.createConnection('mysql://root:nam123@localhost/checked_db?supportBigNumbers=true&bigNumberStrings=true&dateStrings: true');

module.exports = connection;