const express = require('express');
const api = require('../app/controllers/API');
const router = express.Router();

router.post('/register', api.register);
router.post('/login', api.login);
router.get('/user', api.user);
router.get('/', api.index);



module.exports = router;