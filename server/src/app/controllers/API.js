const pool = require('../models/pool');
const bcrypt = require('bcrypt');
const saltRound = 10;

class API {
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

        bcrypt.hash(MatKhau, saltRound, (err, hash) => {
            if(err) {
                console.log({message:"Đã có một lỗi bất thường xảy ra, đăng kí tài khoản thất bại!"});   
            }
            pool.query(sql,[Ho, Ten, Email, TenDN, hash] , function (error, results, fields) {
                if (error) {
                    console.log({message:"Kết nối DataBase thất bại"}); 
                } else {
                    res.send(results);
                }                            
            });
        })
        
    }

    // [POST] /api/login
    login(req, res, next) {
        const sql = "select * from taikhoan where TenDN = ? ";
        const TenDN = req.body.TenDN;
        const MatKhau = req.body.MatKhau;

        pool.query(sql,[TenDN, MatKhau], function (error, results, fields) {
            if (error) {
                res.send({error: error});
            }
            if (results.length > 0){
                bcrypt.compare(MatKhau, results[0].MatKhau, (err, response) => {
                    if(response){
                        res.send(results);
                    } else {
                        res.send({message: "Tên Đăng Nhập hoặc mật khẩu không đúng!"});
                    }                   
                } )
            } else {
                res.send({message:"Tài khoản không tồn tại!"});
            }
        });
    }

    // [GET] /api/user
    user(req, res, next) {
        pool.query('SELECT * FROM taikhoan', function (error, results, fields) {
            if (error) throw error;          
                res.send(results);
        });
    }
}

module.exports = new API;