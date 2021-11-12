const connection = require('../models/AuctionData')
class SiteController {
    // [GET] /
    index(req, res){
        connection.query('SELECT * FROM durex', function (error, results, fields) {
            if (error) throw error;
            
            res.send(results);
        });
    }
}

module.exports = new SiteController;