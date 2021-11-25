
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const secret_key = require("../config/token");
const pool = require("../models/pool");

const sql = "select idTK, PhanQuyen from taikhoan where idTK = ? and TenDN = ?";
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secret_key.secret_key;
opts.iss = "greypanther auction site";

module.exports =  passport => {
  passport.use(
    new JwtStrategy(opts, async function (jwt_payload, done) {
      try {
        pool.query(
          sql,
          [jwt_payload.idTK, jwt_payload.TenDN],
          function (error, user, fields) {
            if (error)
              throw error;
            if (user.length > 0) {
              done(null, user);
            } else {
              done(null, false);
            }
          }
        );
      } catch (error) {
        done(error, false);
      }
    })
  );
};
