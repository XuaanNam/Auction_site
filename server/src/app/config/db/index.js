require('dotenv').config();

module.exports = {
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : 'auctiondata',
    clearExpired: true,
    checkExpirationInterval: 900000,
    expiration: 86400000,
    createDatabaseTable: true,
    supportBigNumbers: true,
    bigNumberStrings: true,
    dateStrings: true,
    multipleStatements: true,
};


//var connection = mysql.createConnection('mysql://root:nam123@localhost/checked_db?supportBigNumbers=true&bigNumberStrings=true&dateStrings: true');
