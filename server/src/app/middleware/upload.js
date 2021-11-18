const multer  = require('multer');
const storage = require('../config/img');

const upload = multer({ 
    storage: storage,
    fileFilter: function (req, file, cb) {
        if(file.mimetype === 'image/jpeg'||
        file.mimetype === 'image/png'||
        file.mimetype === 'image/jpg'|| 
        file.mimetype === 'image/gif') {
            cb(null, true);
        } else {
            cb(null, false);
        }
    } 
})

module.exports = upload;