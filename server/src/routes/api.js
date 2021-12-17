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
router.patch('/update/profile', passport.authenticate('jwt', {session: false}), api.updateProfile);
router.post('/stored/avatar', passport.authenticate('jwt', {session: false}), upload.single('avatar'), api.storedAvatar);
router.patch('/delete/avatar', passport.authenticate('jwt', {session: false}), api.deleteAvatar);

router.get('/admin/get/all/product', passport.authenticate('jwt', {session: false}), api.getAllProduct);
router.get('/admin/get/product', passport.authenticate('jwt', {session: false}), api.getProduct);
router.post('/admin/update/img/product', passport.authenticate('jwt', {session: false}), upload.single('banner'), api.updateImgProduct);
router.post('/admin/stored/product', passport.authenticate('jwt', {session: false}), upload.single('banner'), api.storedProduct);
router.patch('/admin/update/product', passport.authenticate('jwt', {session: false}), api.updateProduct);
router.delete('/admin/delete/product', passport.authenticate('jwt', {session: false}), api.deleteProduct);

router.post('/admin/stored/auction', passport.authenticate('jwt', {session: false}), api.storedAuction);
router.patch('/admin/update/auction', passport.authenticate('jwt', {session: false}), api.updateAuction);
router.delete('/admin/delete/auction', passport.authenticate('jwt', {session: false}), api.deleteAuction);

router.get('/search', passport.authenticate('jwt', {session: false}), api.search);
router.get('/get/all/auction', passport.authenticate('jwt', {session: false}), api.getAuction);
router.get('/auction/info', passport.authenticate('jwt', {session: false}), api.auctionInfo);
router.get('/get/auction/iscoming', api.getComingAuction);
router.post('/auction/loved', passport.authenticate('jwt', {session: false}), api.auctionLoved);
router.get('/my/cart', passport.authenticate('jwt', {session: false}), api.myCart);
router.delete('/delete/my/cart', passport.authenticate('jwt', {session: false}), api.deleteMyCart);
router.get('/my/loved', passport.authenticate('jwt', {session: false}), api.myLoved);
router.delete('/delete/my/loved', passport.authenticate('jwt', {session: false}), api.deleteMyLoved);
router.get('/my/bill', passport.authenticate('jwt', {session: false}), api.getMyBill);
router.post('/payment/paypal', passport.authenticate('jwt', {session: false}), api.paymentByPaypal);
router.get('/paymentSuccess', api.paymentSuccess);

router.post('/', api.index);



module.exports = router;