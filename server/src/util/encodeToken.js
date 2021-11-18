require('dotenv').config();
const jwt = require('jsonwebtoken');
const secret_key = require('../app/config/token');


module.exports = function encodeToken(payload){
    return jwt.sign(
        payload,
        secret_key.secret_key,
        {
            expiresIn: 60 * 60 * 72 * 1000,
        }
    );
}
