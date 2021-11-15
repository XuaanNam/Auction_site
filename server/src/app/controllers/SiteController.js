const connection = require('../models/connection')
class SiteController {
    // [GET] /
    index(req, res){
        connection.query('SELECT * FROM taikhoan', function (error, results, fields) {
            if (error) throw error;
            
                res.send(results);
        });
    }
}

module.exports = new SiteController;