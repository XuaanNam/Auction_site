const apiRouter = require("./api");
const config = require("../app/config/db");
const pool = require("../app/models/pool")
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const sessionStore = new MySQLStore({config}, pool );
pool.query('SELECT 2001 + 79 AS solution', function (error, results, fields) {
    if (error) throw error;
    console.log('Connect to MySql successfully with password: ', results[0].solution);
  });
function route(app) {
    app.use(
        session({
            key: 'userId',
            secret: 'auth_user_for_bannersite',
            store: sessionStore,
            resave: false,
            saveUninitialized: false,
            cookie: { 
                expires: 8640000,
            }
        })
    );
    app.use("/api", apiRouter);
}
module.exports = route;