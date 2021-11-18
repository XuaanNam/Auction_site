const express = require('express');
const api = require('../app/controllers/API');
const router = express.Router();
const passport = require('passport');

router.post('/register', api.register);
router.post('/login', api.login);
router.get('/isAuth', passport.authenticate('jwt', { session: false }), api.isAuth);
router.get('/user', api.user);
router.patch('/update/password', passport.authenticate('jwt', {session: false}), api.updatePassword);
router.patch('/update/profile', passport.authenticate('jwt', {session: false}), api.updateProfile);

router.get('/', api.index);



module.exports = router;