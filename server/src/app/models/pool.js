const pool = require('../models/AuctionData');

pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected!

    // Use the connection
    connection.query({
        sql: 'SELECT * FROM `books` WHERE `author` = ?',
        timeout: 40000, // 40s
        values: ['David'],
        },
        function (error, results, fields) {

        // When done with the connection, release it.
        connection.release();

        // Handle error after the release.
        if (error) throw error;
        }
    );
});
pool.end(function (err) {
    // all connections in the pool have ended
  });


// pool.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//     if (error) throw error;
//     console.log('The solution is: ', results[0].solution);
// });