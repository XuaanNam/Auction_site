module.exports = {
    host     : 'localhost',
    user     : 'root',
    password : 'nam123',
    database : 'auctiondata',
    supportBigNumbers: true,
    bigNumberStrings: true,
    dateStrings: true,
    multipleStatements: true,

    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

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

//var connection = mysql.createConnection('mysql://root:nam123@localhost/checked_db?supportBigNumbers=true&bigNumberStrings=true&dateStrings: true');
