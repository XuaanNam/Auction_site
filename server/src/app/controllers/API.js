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
        const insertSql = "insert into taikhoan (Ho, Ten, Email, TenDN, MatKhau) value (?,?,?,?,?)";
        const selectSql = 'select Email from taikhoan where Email = ?';

        const Ho = req.body.Ho;
        const Ten = req.body.Ten;
        const Email = req.body.Email;
        const TenDN = req.body.TenDN;
        const MatKhau = req.body.MatKhau;

        bcrypt.hash(MatKhau, saltRound, (err, hash) => {
            if(err) {
                res.status(200).send({message:"Mật khẩu không được mã hóa"});   
            }

            pool.getConnection(function(err, connection) {
                if (err) throw err; // not connected!
               
                // Use the connection
                connection.query(selectSql , Email, function (error, results, fields) {
                    if (error) {
                        res.status(200).send({message:"Kết nối DataBase thất bại"}); 
                    } else {
                        if(results.length > 0) {
                            console.log(results);
                            res.status(200).send({message:"Email đã được dùng để đăng kí tài khoản. Vui lòng chọn quên mật khẩu!"});
                    
                        } else {
                            connection.query(insertSql,[Ho, Ten, Email, TenDN, hash] , function (error, results, fields) {
                                if (error) {
                                    res.status(200).send({message:"Kết nối DataBase thất bại"}); 
                                } else {
                                    res.send(results);
                                }                            
                            });
                        }                    
                        connection.release();
                    }                            
                });
       
            });           
        })       
    }

    // [GET] /api/islogin
    isLogin(req, res, next){
        if(req.session.user){
            res.send({loggedIn: true, user: req.session.user});
        } else {
            res.send({loggedIn: false})
        }
    }

    // [POST] /api/login
    login(req, res, next) {
        const sql = "select * from taikhoan where Email = ? ";
        const Email = req.body.Email;
        const MatKhau = req.body.MatKhau;

        pool.query(sql,[Email], function (error, results, fields) {
            if (error) {
                res.send({error: error});
            }
            if (results.length > 0){
                bcrypt.compare(MatKhau, results[0].MatKhau, (err, response) => {
                    if(response){
                        req.session.isAuth = true;
                        console.log(req.session)
                        // var oneDay = 8640000;
                        // req.session.cookie.expires = new Date(Date.now() + oneDay);
                        // req.session.cookie.maxAge = oneDay;
                        // req.session.user = results;
                        res.send(results);
                    } else {
                        res.status(200).send({message: "Tên Đăng Nhập hoặc mật khẩu không đúng!"});
                    }                   
                } )
            } else {
                res.status(200).send({message:"Tài khoản không tồn tại!"});
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