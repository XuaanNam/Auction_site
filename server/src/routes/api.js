const express = require('express');
const api = require('../app/controllers/API');
const router = express.Router();
const passport = require('passport');
const upload = require('../app/middleware/upload')


router.post('/register', api.register);
router.post('/login', api.login);
// router.get('/logout', api.logout);
router.get('/isAuth', passport.authenticate('jwt', { session: false }), api.isAuth);

router.get('/get/user', passport.authenticate('jwt', {session: false}), api.user);
router.patch('/update/password', passport.authenticate('jwt', {session: false}), api.updatePassword);
router.post('/stored/avatar', passport.authenticate('jwt', {session: false}), upload.single('avatar'), api.storedAvatar);
router.patch('/update/profile', passport.authenticate('jwt', {session: false}), api.updateProfile);

router.post('/admin/get/product', passport.authenticate('jwt', {session: false}), api.getProduct);
router.post('/admin/stored/img/product', passport.authenticate('jwt', {session: false}), upload.single('Image'), api.storedImgProduct);
router.post('/admin/stored/product', passport.authenticate('jwt', {session: false}), api.storedProduct);
router.patch('/admin/update/product', passport.authenticate('jwt', {session: false}), api.updateProduct);
router.delete('/admin/delete/product', passport.authenticate('jwt', {session: false}), api.updateProduct);

router.post('/admin/stored/auction', passport.authenticate('jwt', {session: false}), api.storedAuction);
router.patch('/admin/update/auction', passport.authenticate('jwt', {session: false}), api.updateAuction);
router.delete('/admin/delete/auction', passport.authenticate('jwt', {session: false}), api.updateAuction);
router.post('/admin/auction/settimer',passport.authenticate('jwt', {session: false}), api.setTimer);

router.get('/get/all/auction', passport.authenticate('jwt', {session: false}), api.getAuction);
router.get('/auction/info', passport.authenticate('jwt', {session: false}), api.auctionInfo);

router.post('/', api.index);



module.exports = router;