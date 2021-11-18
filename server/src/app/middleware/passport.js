const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const secret_key = require("../config/token");
const pool = require("../models/pool");

const sql = "select idTK from taikhoan where idTK = ? and TenDN = ?";
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secret_key.secret_key;
opts.iss = "greypanther auction site";

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, async function (jwt_payload, done) {
      console.log("payload:", jwt_payload);
      try {
        pool.query(
          sql,
          [jwt_payload.idTK, jwt_payload.TenDN],
          function (error, results, fields) {
            if (error) throw error;
            if (results.length > 0) {
              done(null, results);
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
