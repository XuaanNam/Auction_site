const express = require('express');
const siteController = require('../app/controllers/SiteController');
const router = express.Router();

router.post('/api/register', siteController.register);
router.get('/api/user', siteController.user);
router.get('/', siteController.index);



module.exports = router;