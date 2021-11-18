const pool = require("../models/pool");
const bcrypt = require("bcrypt");
const saltRound = 10;
const encodeToken = require("../../util/encodeToken");
const Cookies = require("universal-cookie");


class API {
    // [GET] /api
    index(req, res, next) {
        pool.query("SELECT * FROM taikhoan", function (error, results, fields) {
            if (error) throw error;

            res.send(results);
        });
    }

    // [POST] /api/register
    register(req, res, next) {
        const insertSql =
        "insert into taikhoan (Ho, Ten, Email, TenDN, MatKhau) value (?,?,?,?,?)";
        const selectSql = "select Email from taikhoan where Email = ?";
        const messEmail =
        "Email đã được dùng để đăng kí tài khoản. Vui lòng chọn quên mật khẩu!";

        const Ho = req.body.Ho;
        const Ten = req.body.Ten;
        const Email = req.body.Email;
        const TenDN = req.body.TenDN;
        const MatKhau = req.body.MatKhau;

        bcrypt.hash(MatKhau, saltRound, (err, hash) => {
            if (err) {
                res.status(200).send({ message: "Mật khẩu không được mã hóa" });
            }

            pool.getConnection(function (err, connection) {
                if (err) throw err; // not connected!

                // Use the connection
                connection.query(selectSql, Email, function (error, results, fields) {
                    if (error) {
                        res.status(200).send({ message: "Kết nối DataBase thất bại" });
                    } else {
                        if (results.length > 0) {
                        res.status(200).send({ message: messEmail });
                        } else {
                        connection.query(
                            insertSql,
                            [Ho, Ten, Email, TenDN, hash],
                            function (error, results, fields) {
                            if (error) {
                                res
                                .status(200)
                                .send({ message: "Kết nối DataBase thất bại" });
                            } else {
                                res.send(results);
                            }
                            }
                        );
                        }
                        connection.release();
                    }
                });            
            });
        });
    }

    // [GET] /api/isAuth
    isAuth(req, res, next) {
        res.status(200).send({ isAuth: true });
    }

    // [POST] /api/login
    login(req, res, next) {
        const sql = "select * from taikhoan where Email = ? ";
        const Email = req.body.Email;
        const MatKhau = req.body.MatKhau;

        pool.query(sql, Email, function (error, results, fields) {
            if (error) {
                res.send({ error: error });
            }
            if (results.length > 0) {
                bcrypt.compare(MatKhau, results[0].MatKhau, (err, response) => {
                    if (response) {
                        const payload = {
                        iss: "grey panther auction site",
                        idTK: results[0].idTK,
                        TenDN: results[0].TenDN,
                        PhanQuyen: results[0].PhanQuyen,
                        };
                        const token = "Bearer " + encodeToken(payload);
                        res.setHeader("isAuth", token);

                        res.send({ isAuth: response, idTK: results[0].idTK, TenDN: results[0].TenDN});
                    } else {
                        res
                        .status(200)
                        .send({ message: "Tên Đăng Nhập hoặc mật khẩu không đúng!" });
                    }
                });
            } else {
                res.status(200).send({ message: "Tài khoản không tồn tại!" });
            }
        });
    }

    // [PATCH] /api/change/password
    updatePassword(req, res, next) {

        
        const idTK = req.body.userid;
        const TenDN = req.body.username;

        const updateSql = "update taikhoan set MatKhau = ? where idTK = ?";
        const selectSql = "select MatKhau from taikhoan where idTK = ? and TenDN = ?";
        const MkCu = req.body.MkCu;
        const MkMoi = req.body.MkMoi;

        pool.getConnection(function (err, connection) {
            if (err) throw err; // not connected!
            connection.query(selectSql, [idTK, TenDN], function (error, results, fields) {
                if (error) {
                    res.send({  message: "Kết nối DataBase thất bại"  });
                }
                if (results.length > 0) {
                    bcrypt.compare(MkCu, results[0].MatKhau, (err, response) => {
                        if (response) {
                            bcrypt.hash(MkMoi, saltRound, (err, hash) => {
                                connection.query(updateSql, [hash, idTK], function (err, results, fields) {
                                    if (error) {
                                        res.status(200).send({  message: "Kết nối DataBase thất bại"  });
                                    } else {
                                        res.send({check: "Đổi mk thành công"});
                                    }
                                })
                                connection.release();
                            });
                        } else {
                            res.status(200).send({ message: "Mật khẩu không đúng!" });
                        }
                    });
                } else { 
                    res.status(200).send({isAuth: false});
                }
            });            
        });
    }

    // [PATCH] /api/change/password
    updateProfile(req, res, next){     

        const updateSql = "update taikhoan set Ho = ? , Ten = ? , NgaySinh = ? , Email = ? , SDT = ? where idTK = ?";
        const selectSql = "select MatKhau from taikhoan where idTK = ? and TenDN = ? ";
                
        const   idTK = req.body.userid,
                TenDN = req.body.username,
                Ho = req.body.Ho, 
                Ten = req.body.Ten,      
                NgaySinh = req.body.NgaySinh, 
                Email = req.body.Email, 
                SDT = req.body.SDT
        
                console.log('adu: ',idTK, TenDN, Ho, Ten, NgaySinh, Email, SDT)

        pool.getConnection(function (err, connection) {
            if (err) throw err; // not connected!
            connection.query(selectSql, [idTK, TenDN], function (error, results, fields) {
                if (error) {
                    res.send({  message: "Kết nối DataBase thất bại"  });
                }
                if (results.length > 0) {      
                    connection.query(updateSql, [Ho, Ten, NgaySinh, Email, SDT, idTK], function (err, results, fields) {
                        if (error) {
                            res.status(200).send({  message: "Kết nối DataBase thất bại"  });
                        } else { 
                            if(results){
                                res.send({check: "Cập nhật thông tin thành công"});
                            } else { 
                                res.send({check: "Cập nhật thất bại, lỗi cú pháp!"});
                            }
                        }
                    })
                    connection.release();               
                } else { 
                    res.status(200).send({isAuth: false});
                }
            });              
        });       
       
    }

    // [GET] /api/user
    user(req, res, next) {
        pool.query("SELECT * FROM taikhoan", function (error, results, fields) {
            if (error) throw error;
            res.send(results);
        });
    }
}

module.exports = new API();
