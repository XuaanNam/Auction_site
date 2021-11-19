const apiRouter = require("./api");
const passport = require('passport');
const checkPassport = require('../app/middleware/passport')(passport);
const sess = require('../app/config/cookies');
const cookieParser = require('cookie-parser');

function route(app) {
    app.use(passport.initialize());
    checkPassport;
    
    app.use(cookieParser('sess.secret'));
    app.use("/api", apiRouter);
}

module.exports = route;