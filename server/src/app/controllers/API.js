const pool = require("../models/pool");
const bcrypt = require("bcrypt");
const saltRound = 10;
const encodeToken = require("../../util/encodeToken");
const CronJob = require('cron').CronJob;
const io = require("socket.io-client");
const job = [];

class API {

    // [POST] /api
    index(req, res, next) {

    }

    // [POST] /api/register
    register(req, res, next) {
        const insertSql = "insert into taikhoan (Ho, Ten, Email, TenDN, MatKhau) value (?,?,?,?,?)";
        const selectSql = "select Email from taikhoan where Email = ?";
        const messEmail = "Email đã được dùng để đăng kí tài khoản. Vui lòng chọn quên mật khẩu!";

        const Ho = req.body.Ho;
        const Ten = req.body.Ten;
        const Email = req.body.Email;
        const TenDN = req.body.TenDN;
        const MatKhau = req.body.MatKhau;
        const CFMatKhau = req.body.CFMatKhau;

        if(CFMatKhau !== MatKhau){
            res.status(200).send({ message: "Mật khẩu xác nhận không khớp!" });
        } else {
            bcrypt.hash(MatKhau, saltRound, (err, hash) => {
                if (err) {
                    res.status(200).send({ message: "Mật khẩu không được mã hóa" });
                }
                console.log('hash:', hash, Ho, Ten, TenDN, Email);
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
                                        .send({ message: "Kết nối DataBase thất bại, lỗi cú pháp" });
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
    }

    // [GET] /api/isAuth
    isAuth(req, res, next) {
        const PQ =  req.user[0].PhanQuyen;

        res.status(200).send({ isAuth: true, PQ: PQ });
 
       
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

                        res.send({ isAuth: response, TenDN: results[0].TenDN, PQ: results[0].PhanQuyen});
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

    // [PATCH] /api/update/password
    updatePassword(req, res, next) {
       
        const idTK =  req.user[0].idTK;

        const updateSql = "update taikhoan set MatKhau = ? where idTK = ?";
        const selectSql = "select MatKhau from taikhoan where idTK = ?";
        const MkCu = req.body.MkCu;
        const MkMoi = req.body.MkMoi;

        pool.getConnection(function (err, connection) {
            if (err) throw err; // not connected!
            connection.query(selectSql, idTK, function (error, results, fields) {
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

    // [PATCH] /api/update/profile
    updateProfile(req, res, next){     

        const updateSql = "update taikhoan set Ho = ? , Ten = ? , NgaySinh = ? , Email = ? , SDT = ? where idTK = ?";

        const idTK =  req.user[0].idTK;
        const   Ho = req.body.Ho, 
                Ten = req.body.Ten,      
                NgaySinh = req.body.NgaySinh ? req.body.NgaySinh: "",
                SDT = req.body.SDT ? req.body.SDT : "";

        pool.query(updateSql, [Ho, Ten, NgaySinh, Email, SDT, idTK], function (err, results, fields) {
            if (error) {
                res.status(200).send({  message: "Kết nối DataBase thất bại"  });
            } else { 
                if(results){
                    res.send({check: "Cập nhật thông tin thành công"});
                } else { 
                    res.send({check: "Cập nhật thông tin thất bại, lỗi cú pháp!"});
                }
            }
        });     
    }

    // [POST] /api/stored/avatar
    storedAvatar(req, res, next){

        const updateSql = "update taikhoan set Avt = ? where idTK = ?";
                
        const idTK =  req.user[0].idTK; 
        const Avt = req.file.path;

        pool.query(updateSql, [Avt, idTK], function (err, results, fields) {
            if (error) {
                res.status(200).send({  message: "Kết nối DataBase thất bại"  });
            } else { 
                if(results){
                    res.send({message: "Cập nhật ảnh đại diện thành công"});
                } else { 
                    res.send({message: "Cập nhật ảnh đại diện thất bại, lỗi cú pháp!"});
                }
            }
        })
    }

    // [POST] /api/admin/stored/img/product
    storedImgProduct(req, res, next){
        const updateSql = "update sanpham set HinhAnh = ? where idSP = ?";

        const PQ =  req.user[0].PhanQuyen;
        const HinhAnh = req.file.path
              idSP = req.body.idSP;

        if(PQ === 0){
            res.send({message: "Bạn chưa được cấp quyền admin để thêm ảnh cho SP này!"})
        } else {
            pool.query(updateSql, [HinhAnh, idSP], function (err, results, fields) {
                if (error) {
                    res.status(200).send({  message: "Kết nối DataBase thất bại"  });
                } else { 
                    if(results){
                        res.send({check: "Thêm ảnh cho SP thành công"});
                    } else { 
                        res.send({check: "Thêm ảnh cho SP thất bại, lỗi cú pháp!"});
                    }
                }
            });
        }
    }

    // [POST] /api/admin/stored/product
    storedProduct(req, res, next){
        const insertSql = "insert into sanpham ( Website, ViTri, Gia, MoTa) values (?, ?, ?, ?)";
        
        const PQ =  req.user[0].PhanQuyen; 
        const   Website = req.body.Website,      
                ViTri = req.body.ViTri, 
                Gia = req.body.Gia, 
                MoTa = req.body.MoTa

        if(PQ === 0){
            res.send({message: "Bạn chưa được cấp quyền admin để lưu trữ SP này!"})
        } else {
            pool.query(insertSql, [Website, ViTri, Gia, MoTa], function (err, results, fields) {
                if (error) {
                    res.status(200).send({  message: "Kết nối DataBase thất bại"  });
                } else { 
                    if(results){
                        res.send({check: "Thêm SP thành công"});
                    } else { 
                        res.send({check: "Thêm SP thất bại, lỗi cú pháp!"});
                    }
                }
            });
        }      
    }

    // [PATCH] /api/admin/update/product
    updateProduct(req, res, next){
        const updateSql = "update sanpham set Website = ?, ViTri = ?, Gia = ?, MoTa = ? where idSP = ?";
        
        const PQ =  req.user[0].PhanQuyen; 
        const   Website = req.body.Website,      
                ViTri = req.body.ViTri, 
                Gia = req.body.Gia, 
                MoTa = req.body.MoTa,
                idSP = req.body.idSP

        if(PQ === 0){
            res.send({message: "Bạn chưa được cấp quyền admin để chỉnh sửa nội dung SP này!"})
        } else {
            pool.query(updateSql, [Website, ViTri, Gia, MoTa, idSP], function (err, results, fields) {
                if (error) {
                    res.status(200).send({  message: "Kết nối DataBase thất bại"  });
                } else { 
                    if(results){
                        res.send({check: "Cập nhật SP thành công"});
                    } else { 
                        res.send({check: "Cập nhật SP thất bại, lỗi cú pháp!"});
                    }
                }
            });  
        }   
    }

    // [DELETE] /api/admin/delete/product
    deleteProduct(req, res, next){
        const deleteSql = "delete from sanpham where idSP = ?";
        
        const PQ =  req.user[0].PhanQuyen; 
        const   idSP = req.body.idSP;

        if(PQ === 0){
            res.send({message: "Bạn chưa được cấp quyền admin để xóa SP này!"})
        } else {
            pool.query(deleteSql, idSP, function (err, results, fields) {
                if (error) {
                    res.status(200).send({  message: "Kết nối DataBase thất bại"  });
                } else { 
                    if(results){
                        res.send({check: "Xóa SP thành công"});
                    } else { 
                        res.send({check: "Xóa SP thất bại, lỗi cú pháp!"});
                    }
                }
            });
        }      
    }

    // [POST] /api/admin/stored/auction
    storedAuction(req, res, next){
        const insertSql = "insert into daugia (idSP, TgBatDau, TgDauGia, GiaKhoiDiem, TrangThai, BuocGia) values (?, ?,?,?,?,?)";
        
        const PQ =  req.user[0].PhanQuyen;   
        const   idSP = req.body.idSP, 
                TgBatDau = req.body.TgBatDau, 
                TgDauGia = req.body.TgDauGia     
                GiaKhoiDiem = req.body.GiaKhoiDiem, 
                TrangThai = req.body.TrangThai, 
                BuocGia = req.body.BuocGia

        if(PQ === 0){
            res.send({message: "Bạn chưa được cấp quyền admin để thêm game ĐG này!"})
        } else {
            pool.query(insertSql, [idSP, TgBatDau, TgDauGia, GiaKhoiDiem, TrangThai, BuocGia], function (err, results, fields) {
                if (error) {
                    res.status(200).send({  message: "Kết nối DataBase thất bại"  });
                } else { 
                    if(results){
                        res.send({check: "Thêm game ĐG thành công"});
                    } else { 
                        res.send({check: "Thêm game ĐG thất bại, lỗi cú pháp!"});
                    }
                }
            });
        }      
    }

    // [PATCH] /api/admin/update/auction
    updateAuction(req, res, next){
        const updateSql = "update daugia set idSP = ?, TgBatDau = ?, TgDauGia = ?, GiaKhoiDiem = ?, TrangThai = ?,BuocGia=? where idDG = ?";
     
        const PQ =  req.user[0].PhanQuyen;       
        const   idSP = req.body.idSP, 
                TgBatDau = req.body.TgBatDau, 
                TgDauGia = req.body.TgDauGia     
                GiaKhoiDiem = req.body.GiaKhoiDiem, 
                TrangThai = req.body.TrangThai, 
                BuocGia = req.body.BuocGia,
                idDG = req.body.idDG;

        if(PQ === 0){
            res.send({message: "Bạn chưa được cấp quyền admin để chỉnh sửa game ĐG này!"})
        } else {
            pool.query(updateSql, [idSP, TgBatDau, TgDauGia, GiaKhoiDiem, TrangThai, BuocGia, idDG], function (err, results, fields) {
                if (error) {
                    res.status(200).send({  message: "Kết nối DataBase thất bại"  });
                } else { 
                    if(results){
                        res.send({check: "Cập nhật game ĐG thành công"});
                    } else { 
                        res.send({check: "Cập nhật game ĐG thất bại, lỗi cú pháp!"});
                    }
                }
            });
        }      
    }

    // [DELETE] /api/admin/delete/auction
    deleteProduct(req, res, next){
        const deleteSql = "delete from daugia where idDG = ?";
        
        const PQ =  req.user[0].PhanQuyen; 
        const idDG = req.body.idDG

        if(PQ === 0){
            res.send({message: "Bạn chưa được cấp quyền admin để xóa game ĐG này!"})
        } else {
            pool.query(deleteSql, idDG, function (err, results, fields) {
                if (error) {
                    res.status(200).send({  message: "Kết nối DataBase thất bại"  });
                } else { 
                    if(results){
                        res.send({check: "Xóa game ĐG thành công"});
                    } else { 
                        res.send({check: "Xóa game ĐG thất bại, lỗi cú pháp!"});
                    }
                }
            });
        }       
    }

    // [GET] /api/auction/info
    auctionInfo(req, res, next){
        
        const sql = "select * from sanpham s, daugia d where s.idSP = d.idSP and idDG = ? ";
        const idDG = req.query.id;

        pool.query(sql, idDG, function (error, results, fields) {
            if (error) {
                res.send({ error: error });
            }
            if (results.length > 0) {
                res.send({  
                    highestPrice: results[0].GiaKhoiDiem, 
                    priceStep: results[0].BuocGia,
                    website: results[0].Website,
                    position: results[0].ViTri,
                    bannerSize: results[0].KichThuoc,
                    urlImage: results[0].HinhAnh,
                    dateTime: results[0].TgDauGia,
                    decription: results[0].MoTa
                });           
            } else {
                res.status(200).send({ message: "Sàn đấu giá không tồn tại!" });
            }
        });
    }

    // [POST] /api/admin/auction/settimer
    setTimer(req, res, next) { 
        const PQ =  req.user[0].PhanQuyen;
        if(PQ === 0){
            res.send({message: "Bạn chưa được cấp quyền admin để sắp dặt thời gian đấu giá!"})
        } else {
            const idDG = req.body.idDG;
            const TgBatDau = req.body.TgBatDau; //2021-11-21 00:00:00
            const TgDauGia = parseInt(req.body.TgDauGia) * 60;    

            const getDate = TgBatDau.split(' ')[0].split('-');
            const getTime = TgBatDau.split(' ')[1].split(':');
            const y = parseInt(getDate[0]);
            const m = (parseInt(getDate[1]) - 1);
            const d = parseInt(getDate[2]);
            const h = parseInt(getTime[0]);
            const mi = parseInt(getTime[1]);
            const s = parseInt(getTime[2]);

            const date = new Date(y, m, d, h, mi, s);

            job[parseInt(idDG)] = new CronJob(date, function() {   
                //console.log('Đấu giá bắt đầu')
                const socket = io.connect("http://localhost:4000");
                
                socket.emit('settimer', {room: idDG, time: TgDauGia});
                setTimeout( () => {  
                    socket.emit("leave_room", idDG);
                }, 2000);
            }, null, true);
            res.send({message: "Đã lên lịch cho game đấu giá này!"});
        }
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
