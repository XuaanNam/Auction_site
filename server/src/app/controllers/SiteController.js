const pool = require('../models/pool')
class SiteController {
    // [GET] /
    index(req, res, next) {
        pool.query('SELECT * FROM taikhoan', function (error, results, fields) {
            if (error) throw error;
            
                res.send(results);
        });
    }

    // [POST] /api/register
    register(req, res, next) {
        const sql = "insert into taikhoan (Ho, Ten, Email, TenDN, MatKhau) value (?,?,?,?,?)";

        const Ho = req.body.Ho;
        const Ten = req.body.Ten;
        const Email = req.body.Email;
        const TenDN = req.body.TenDN;
        const MatKhau = req.body.MatKhau;

        pool.query(sql,[Ho, Ten, Email, TenDN, MatKhau] , function (error, results, fields) {
            if (error) throw error;
            res.send(results);
        });
    }

    user(req, res, next) {
        pool.query('SELECT * FROM taikhoan', function (error, results, fields) {
            if (error) throw error;
            
                res.send(results);
        });
    }
}

module.exports = new SiteController;