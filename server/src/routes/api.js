const express = require('express');
const api = require('../app/controllers/API');
const router = express.Router();
const passport = require('passport');
const upload = require('../app/middleware/upload')


router.post('/register', api.register);
router.post('/login', api.login);
router.get('/isAuth', passport.authenticate('jwt', { session: false }), api.isAuth);

router.patch('/update/password', passport.authenticate('jwt', {session: false}), api.updatePassword);
router.post('/stored/avatar',  passport.authenticate('jwt', {session: false}),  upload.single('Avatar'), api.storedAvatar);
router.patch('/update/profile', passport.authenticate('jwt', {session: false}), api.updateProfile);

router.post('/admin/stored/img/product', passport.authenticate('jwt', {session: false}), upload.single('Avatar'), api.storedImgProduct);
router.post('/admin/stored/product', passport.authenticate('jwt', {session: false}), api.storedProduct);
router.patch('/admin/update/product', passport.authenticate('jwt', {session: false}), api.updateProduct);
router.delete('/admin/delete/product', passport.authenticate('jwt', {session: false}), api.updateProduct);

router.post('/admin/stored/auction', passport.authenticate('jwt', {session: false}), api.storedAuction);
router.patch('/admin/update/auction', passport.authenticate('jwt', {session: false}), api.updateAuction);
router.delete('/admin/delete/auction', passport.authenticate('jwt', {session: false}), api.updateAuction);
router.post('/admin/auction/settimer', passport.authenticate('jwt', {session: false}), api.setTimer);

router.get('/auction/info', passport.authenticate('jwt', {session: false}), api.auctionInfo);

router.get('/user', api.user);
router.post('/', api.index);



module.exports = router;