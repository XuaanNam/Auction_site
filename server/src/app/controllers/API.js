const pool = require("../models/pool");
const fs = require('fs');
const express = require('express');
const path = require('path');

const bcrypt = require("bcrypt");
const saltRound = 10;
const encodeToken = require("../../util/encodeToken");
const CronJob = require('cron').CronJob;
const io = require("socket.io-client");
const { Console } = require("console");
const job = [];
const trading = [];

class API {

    // [POST] /api
    index(req, res, next) {

    }

    // [POST] /api/register
    register(req, res, next) {
        const insertSql = "insert into taikhoan (Ho, Ten, Email, TenDN, MatKhau) value (?,?,?,?,?)";
        const selectSql1 = "select Email from taikhoan where Email = ?";
        const selectSql2 = "select TenDN from taikhoan where TenDN = ?";
        const messEmail = "Email đã được dùng để đăng kí tài khoản. Vui lòng chọn quên mật khẩu!";
        const messTenDN = "Tên tài khoản đã được dùng để đăng kí tài khoản. Vui lòng chọn tên tài khoản khác!";

        const Ho = req.body.Ho;
        const Ten = req.body.Ten;
        const Email = req.body.Email;
        const TenDN = req.body.TenDN;
        const MatKhau = req.body.MatKhau;
        const CFMatKhau = req.body.CFMatKhau;

        if (CFMatKhau !== MatKhau) {
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
                    connection.query(selectSql1, Email, function (error, results, fields) {
                        if (error) {
                            res.status(200).send({ message: "Kết nối DataBase thất bại" });
                        } else {
                            if (results.length > 0) {
                                res.status(200).send({ message: messEmail });
                            } else {
                                connection.query(selectSql2, TenDN, function (error, results, fields) {
                                    if (error) {
                                        res.status(200).send({ message: "Kết nối DataBase thất bại" });
                                    } else {
                                        if (results.length > 0) {
                                            res.status(200).send({ message: messTenDN });
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
                                    }
                                });
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
        const PQ = req.user[0].PhanQuyen;
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

                        res.send({ isAuth: response, TenDN: results[0].TenDN, PQ: results[0].PhanQuyen });
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

    // [GET] /api/logout
    logout(req, res, next) {
        res.clearCookie("userAuth", { path: "/" });
        res.clearCookie("username", { path: "/" });
        res.status(200).json({ success: true, message: "User logged out successfully" });
    };

    // [GET] /api/get/user
    user(req, res, next) {
        const idTK = req.user[0].idTK;
        const selectSql = "select * from taikhoan where idTK = ?";

        pool.query(selectSql, idTK, function (error, results, fields) {
            if (error) {
                res.send({
                    message: "Cập nhật thông tin không thành công"
                });
            } else {
                res.send({
                    Ten: results[0].Ten,
                    Ho: results[0].Ho,
                    NgaySinh: results[0].NgaySinh,
                    Email: results[0].Email,
                    SDT: results[0].SDT,
                    Avt: results[0].Avt,
                    message: "Cập nhật thông tin thành công"
                });
            }
        });
    }

    // [PATCH] /api/update/password
    updatePassword(req, res, next) {

        const idTK = req.user[0].idTK;

        const updateSql = "update taikhoan set MatKhau = ? where idTK = ?";
        const selectSql = "select MatKhau from taikhoan where idTK = ?";
        const MkCu = req.body.MkCu;
        const MkMoi = req.body.MkMoi;

        pool.getConnection(function (err, connection) {
            if (err) throw err; // not connected!
            connection.query(selectSql, idTK, function (error, results, fields) {
                if (error) {
                    res.send({ message: "Kết nối DataBase thất bại" });
                }
                if (results.length > 0) {
                    bcrypt.compare(MkCu, results[0].MatKhau, (err, response) => {
                        if (response) {
                            bcrypt.hash(MkMoi, saltRound, (err, hash) => {
                                connection.query(updateSql, [hash, idTK], function (err, results, fields) {
                                    if (err) {
                                        res.status(200).send({ message: "Kết nối DataBase thất bại" });
                                    } else {
                                        res.send({ message: "Đổi mật khẩu thành công!" });
                                    }
                                })
                                connection.release();
                            });
                        } else {
                            res.status(200).send({ message: "Mật khẩu cũ không đúng!" });
                        }
                    });
                } else {
                    res.status(200).send({ isAuth: false });
                }
            });
        });
    }

    // [PATCH] /api/update/profile
    updateProfile(req, res, next) {

        const updateSql = "update taikhoan set Ho = ? , Ten = ?, TenDN = ? , NgaySinh = ?, SDT = ? where idTK = ?";

        const idTK = req.user[0].idTK;
        const Ho = req.body.ho,
            Ten = req.body.ten,
            TenDN = req.body.tenDN,
            NgaySinh = req.body.ngaySinh ? req.body.ngaySinh : "",
            SDT = req.body.sDT ? req.body.sDT : "";
        pool.query(updateSql, [Ho, Ten, TenDN, NgaySinh, SDT, idTK], function (err, results, fields) {
            if (err) {
                res.status(200).send({ message: "Kết nối DataBase thất bại" });
            } else {
                if (results) {
                    res.send({ message: "Cập nhật thông tin thành công" });
                } else {
                    res.send({ message: "Cập nhật thông tin thất bại, lỗi cú pháp!" });
                }
            }
        });
    }

    // [POST] /api/stored/avatar
    storedAvatar(req, res, next) {

        const updateSql = "update taikhoan set Avt = ? where idTK = ?";
        const selectSql = "select * from taikhoan where idTK = ?";
        const idTK = req.user[0].idTK; console.log(req.file)
        const Avt = "image" + "/" + req.file.filename;
        const basePath = path.join(__dirname, '../../../../client', 'public');

        pool.getConnection(function (err, connection) {
            if (err) throw err; // not connected!

            // Use the connection
            connection.query(selectSql, idTK, function (error, results, fields) {
                if (error) {
                    res.status(200).send({ message: "Kết nối DataBase thất bại" });
                } else {
                    const filePath = basePath + "/" + results[0].Avt;


                    connection.query(updateSql, [Avt, idTK], function (err, rs, fields) {
                        if (err) {
                            res.status(200).send({ message: "Kết nối DataBase thất bại" });
                        } else {
                            if (rs) {
                                if (results[0].Avt === "" || results[0].Avt === null || results[0].Avt === 'undefined') {
                                    res.send({ message: "Cập nhật ảnh đại diện thành công" });
                                } else {
                                    fs.unlink(filePath, function (err) {
                                        if (err) throw err;
                                        //console.log('ảnh đại diện cũ đã bị xóa!');
                                    });
                                    res.send({ message: "Cập nhật ảnh đại diện thành công, dữ liệu cũ đã bị xóa!" });
                                }
                            } else {
                                res.send({ message: "Cập nhật ảnh đại diện thất bại, lỗi cú pháp!" });
                            }
                        }
                    })

                    connection.release();
                }
            });
        });
    }

    // [PATCH] /api/delete/avatar
    deleteAvatar(req, res, next) {
        const updateSql = "update taikhoan set Avt = '' where idTK = ?";
        const selectSql = "select * from taikhoan where idTK = ?";
        const idTK = req.user[0].idTK;
        const basePath = path.join(__dirname, '../../../../client', 'public');

        pool.getConnection(function (err, connection) {
            if (err) throw err; // not connected!

            // Use the connection
            connection.query(selectSql, idTK, function (error, results, fields) {
                if (error) {
                    res.status(200).send({ message: "Kết nối DataBase thất bại" });
                } else {
                    const filePath = basePath + "/" + results[0].Avt;
                    connection.query(updateSql, idTK, function (err, rs, fields) {
                        if (err) {
                            res.status(200).send({ message: "Kết nối DataBase thất bại" });
                        } else {
                            if (rs) {
                                if (results[0].Avt === "" || results[0].Avt === null || results[0].Avt === 'undefined') {
                                    res.send({ message: "Bạn chưa đặt ảnh đại diện" });
                                } else {
                                    fs.unlink(filePath, function (err) {
                                        if (err) throw err;
                                        //console.log('ảnh đại diện cũ đã bị xóa!');
                                    });
                                    res.send({ message: "Đã xóa ảnh đại diện!" });
                                }
                            } else {
                                res.send({ message: "Xóa ảnh đại diện thất bại, lỗi cú pháp!" });
                            }
                        }
                    })

                    connection.release();
                }
            });
        });
    }

    // [GET] /api/admin/get/all/product (for List.js only)
    getAllProduct(req, res, next) {
        const selectSql = "select * from sanpham where TrangThai = 0";

        const PQ = req.user[0].PhanQuyen;

        if (PQ === 0) {
            res.send({ message: "Bạn chưa được cấp quyền admin để xem thông tin SP này!" })
        } else {
            pool.query(selectSql, function (err, results, fields) {
                if (err) {
                    res.status(200).send({ message: "Kết nối DataBase thất bại" });
                } else {
                    if (results) {
                        res.send(results);
                    } else {
                        res.send({ message: "Không thể lấy dữ liệu" });
                    }
                }
            });
        }
    }

    // [GET] /api/admin/get/product (for addAuction.js only)
    getProduct(req, res, next) {
        const selectSql = "select * from sanpham where idSP = ?";

        const PQ = req.user[0].PhanQuyen;
        const idSP = req.query.idSP;

        if (PQ === 0) {
            res.send({ message: "Bạn chưa được cấp quyền admin để xem thông tin SP này!" })
        } else {
            pool.query(selectSql, idSP, function (err, results, fields) {
                if (err) {
                    res.status(200).send({ message: "Kết nối DataBase thất bại" });
                } else {
                    if (results) {
                        res.send(results);
                    } else {
                        res.send({ check: "Không thể lấy dữ liệu" });
                    }
                }
            });
        }
    }

    // [POST] /api/admin/update/img/product
    updateImgProduct(req, res, next) {
        const updateSql = "update sanpham set HinhAnh = ? where idSP = ?";
        const selectSql = "select * from sanpham where idSP = ?";

        const HinhAnh = "image" + "/" + req.file.filename;
        const basePath = path.join(__dirname, '../../../../client', 'public');

        const PQ = req.user[0].PhanQuyen;
        const idSP = req.body.idSP;

        if (PQ === 0) {
            res.send({ message: "Bạn chưa được cấp quyền admin để thêm ảnh cho SP này!" })
        } else {
            pool.getConnection(function (err, connection) {
                if (err) throw err; // not connected!

                // Use the connection
                connection.query(selectSql, idSP, function (error, results, fields) {
                    if (error) {
                        res.status(200).send({ message: "Kết nối DataBase thất bại" });
                    } else {
                        const filePath = basePath + "/" + results[0].Avt;

                        connection.query(updateSql, [HinhAnh, idSP], function (err, rs, fields) {
                            if (err) {
                                res.status(200).send({ message: "Kết nối DataBase thất bại" });
                            } else {
                                if (rs) {
                                    if (results[0].Avt === "" || results[0].Avt === null || results[0].Avt === 'undefined') {
                                    } else {
                                        fs.unlink(filePath, function (err) {
                                            if (err) throw err;
                                        });
                                    }
                                    res.send({ check: "Thêm ảnh cho SP thành công" });
                                } else {
                                    res.send({ check: "Thêm ảnh cho SP thất bại, lỗi cú pháp!" });
                                }
                            }
                        });
                        connection.release();
                    }
                });
            });
        }
    }

    // [POST] /api/admin/stored/product
    storedProduct(req, res, next) {
        const insertSql = "insert into sanpham ( Website, ViTri, KichThuoc, Gia, MoTa, HinhAnh) values (?, ?, ?, ?, ?, ?)";

        const PQ = req.user[0].PhanQuyen;
        const Website = req.body.Website,
            ViTri = req.body.ViTri,
            KichThuoc = req.body.KichThuoc,
            Gia = parseInt(req.body.Gia),
            MoTa = req.body.MoTa

        const HinhAnh = "image" + "/" + req.file.filename; console.log(req.file);
        if (PQ === 0) {
            res.send({ message: "Bạn chưa được cấp quyền admin để lưu trữ SP này!" })
        } else {
            pool.query(insertSql, [Website, ViTri, KichThuoc, Gia, MoTa, HinhAnh], function (err, results, fields) {
                if (err) {
                    res.status(200).send({ message: "Kết nối DataBase thất bại" });
                } else {
                    if (results) {
                        res.send({ message: "Thêm SP thành công" });
                    } else {
                        res.send({ message: "Thêm SP thất bại, lỗi cú pháp!" });
                    }
                }
            });
        }
    }

    // [PATCH] /api/admin/update/product
    updateProduct(req, res, next) {
        const updateSql = "update sanpham set Website = ?, ViTri = ?, KichThuoc = ?, Gia = ?, MoTa = ? where idSP = ?";

        const PQ = req.user[0].PhanQuyen;
        const Website = req.body.Website,
            ViTri = req.body.ViTri,
            KichThuoc = req.body.KichThuoc,
            Gia = req.body.Gia,
            MoTa = req.body.MoTa,
            idSP = req.body.idSP
        if (PQ === 0) {
            res.send({ message: "Bạn chưa được cấp quyền admin để chỉnh sửa nội dung SP này!" })
        } else {
            pool.query(updateSql, [Website, ViTri, KichThuoc, Gia, MoTa, idSP], function (err, results, fields) {
                if (err) {
                    res.status(200).send({ message: "Kết nối DataBase thất bại" });
                } else {
                    if (results) {
                        res.send({ message: "Cập nhật SP thành công" });
                    } else {
                        res.send({ message: "Cập nhật SP thất bại, lỗi cú pháp!" });
                    }
                }
            });
        }
    }

    // [DELETE] /api/admin/delete/product
    deleteProduct(req, res, next) {
        const deleteSql = "delete from sanpham where idSP = ?";
        const selectSql = "select * from sanpham where idSP = ?";

        const PQ = req.user[0].PhanQuyen;
        const idSP = req.body.idSP;
        const basePath = path.join(__dirname, '../../../../client', 'public');
        if (PQ === 0) {
            res.send({ message: "Bạn chưa được cấp quyền admin để xóa SP này!" })
        } else {
            pool.getConnection(function (err, connection) {
                if (err) throw err; // not connected!
                // Use the connection
                connection.query(selectSql, idSP, function (error, results, fields) {
                    if (error) {
                        res.status(200).send({ message: "Kết nối DataBase thất bại" });
                    } else {
                        const HA = results[0].HinhAnh;
                        const filePath = basePath + "/" + HA;
                        console.log(deleteSql, idSP);
                        connection.query(deleteSql, idSP, function (err, rs, fields) {
                            if (err) {
                                console.log(err);
                                res.status(200).send({ message: "Kết nối DataBase thất bại2" });
                            } else {
                                if (rs) {
                                    if (HA === "" || HA === null || HA === 'undefined') {
                                    } else {
                                        fs.unlink(filePath, function (er) {
                                            if (er) throw er;
                                        });
                                    }
                                    res.send();
                                } else {
                                    res.send({ message: "Xóa SP thất bại, lỗi cú pháp!" });
                                }
                            }
                        });


                        connection.release();
                    }
                });
            });
        }
    }

    // [POST] /api/admin/stored/auction
    storedAuction(req, res, next) {
        const updateSql = "update daugia set TrangThai = 1 where idDG = ?";
        const updateSqlSP = "update sanpham set TrangThai = 1 where idSP = ?";
        const insertSql = "insert into daugia (idSP, TgBatDau, TgDauGia, BuocGia) values (?, ?, ?, ?)";

        const PQ = req.user[0].PhanQuyen;
        const idSP = req.body.idSP,
            TgBatDau = req.body.TgBatDau,   //2021-11-21T00:00:00 
            TgDauGia = req.body.TgDauGia,
            BuocGia = req.body.BuocGia

        if (PQ === 0) {
            res.send({ message: "Bạn chưa được cấp quyền admin để thêm game ĐG này!" })
        } else {
            pool.getConnection(function (err, connection) {
                if (err) throw err; // not connected!
                connection.query(insertSql, [idSP, TgBatDau, TgDauGia, BuocGia], function (err, results, fields) {
                    if (err) {
                        res.status(200).send({ message: "Kết nối DataBase thất bại" });
                    } else {
                        if (results) {
                            connection.query(updateSqlSP, idSP);

                            const idDG = results.insertId.toString();
                            const TgDG = parseInt(TgDauGia) * 60;

                            const getDate = TgBatDau.split('T')[0].split('-');
                            const getTime = TgBatDau.split('T')[1].split('.')[0].split(':');
                            const y = parseInt(getDate[0]);
                            const m = (parseInt(getDate[1]) - 1);
                            const d = parseInt(getDate[2]);
                            const h = parseInt(getTime[0]);
                            const mi = parseInt(getTime[1]);
                            const s = 0;
                            const date = new Date(y, m, d, h, mi, s);

                            job[parseInt(idDG)] = new CronJob(date, function () {
                                pool.query(updateSql, idDG, () => {
                                    console.log('chuyển đổi trạng thái game đấu từ sắp -> đang diễn ra');
                                });
                                const socket = io.connect("http://localhost:4000");

                                socket.emit('settimer', { room: idDG, time: TgDG });
                                setTimeout(() => {
                                    socket.emit("leave_room", idDG);
                                }, 2000);
                                job[parseInt(idDG)] = '';
                            }, null, true);

                            res.send({ message: "Đã lên lịch cho game đấu giá này!", done: true });
                        } else {
                            res.send({ message: "Thêm game ĐG thất bại, lỗi cú pháp!" });
                        }
                    }
                });
            });
        }
    }

    // [PATCH] /api/admin/update/auction
    updateAuction(req, res, next) {
        const updateSql = "update daugia set idSP = ?, TgBatDau = ?, TgDauGia = ?, GiaKhoiDiem = ?, TrangThai = ?,BuocGia=? where idDG = ?";

        const PQ = req.user[0].PhanQuyen;
        const idSP = req.body.idSP,
            TgBatDau = req.body.TgBatDau,
            TgDauGia = req.body.TgDauGia
        GiaKhoiDiem = req.body.GiaKhoiDiem,
            TrangThai = req.body.TrangThai,
            BuocGia = req.body.BuocGia,
            idDG = req.body.idDG;

        if (PQ === 0) {
            res.send({ message: "Bạn chưa được cấp quyền admin để chỉnh sửa game ĐG này!" })
        } else {
            pool.query(updateSql, [idSP, TgBatDau, TgDauGia, GiaKhoiDiem, TrangThai, BuocGia, idDG], function (err, results, fields) {
                if (err) {
                    res.status(200).send({ message: "Kết nối DataBase thất bại" });
                } else {
                    if (results) {
                        res.send({ check: "Cập nhật game ĐG thành công" });
                    } else {
                        res.send({ check: "Cập nhật game ĐG thất bại, lỗi cú pháp!" });
                    }
                }
            });
        }
    }

    // [DELETE] /api/admin/delete/auction
    deleteAuction(req, res, next) {
        const deleteSql = "delete from daugia where idDG = ?";

        const PQ = req.user[0].PhanQuyen;
        const idDG = req.body.idDG

        if (PQ === 0) {
            res.send({ message: "Bạn chưa được cấp quyền admin để xóa game ĐG này!" })
        } else {
            pool.query(deleteSql, idDG, function (err, results, fields) {
                if (err) {
                    res.status(200).send({ message: "Kết nối DataBase thất bại" });
                } else {
                    if (results) {
                        res.send({ check: "Xóa game ĐG thành công" });
                    } else {
                        res.send({ check: "Xóa game ĐG thất bại, lỗi cú pháp!" });
                    }
                }
            });
        }
    }

    // Io.js -> call
    tradingSession(idDG, haveWinner, TenDN, NgayDG, GiaTien) {

        const sqlSelectDG = 'select * from daugia where idDG = ?';
        const sqlSelectTK = 'select * from taikhoan where TenDN = ?';
        const sqlUpdateDG = 'update daugia set TrangThai = 2 where idDG = ?';

        const sqlUpdateSP2 = 'update sanpham set TrangThai = 2 where idSP = ?';
        const sqlUpdateSP1 = 'update sanpham set TrangThai = 0 where idSP = ?';
        const sqlInsertGD = 'insert into giaodich (idSP, idTK, NgayDG, GiaTien, ThongTinGD) value (?, ?, ?, ?, ?)';
        const sqlUpdateGD = 'update giaodich set TrangThai = 1 where idDG = ?';

        const y = new Date(Date.now()).getFullYear();
        const m = new Date(Date.now()).getMonth();
        const d = new Date(Date.now()).getDate();
        const h = new Date(Date.now()).getHours();
        const mi = (new Date(Date.now()).getMinutes() + 10);
        const s = new Date(Date.now()).getSeconds();
        const date = new Date(y, m, d, h, mi, s);

        pool.getConnection(function (error, connection) {
            if (error) throw error; // not connected!
            connection.query(sqlSelectDG, idDG, function (err, results, fields) {
                if (results) {
                    const idSP = results[0].idSP;

                    if (haveWinner === 1) {
                        const ThongTinGD = 'Người dùng ' + TenDN + ' đã chiến thắng sản phẩm có id = ' +
                            idSP + '. Số tiền: ' + GiaTien + 
                            '. Sản phẩm này sẽ được thu hồi sau 10 phút nếu bạn không thanh toán. Thời hạn đến: ' + date ;

                        connection.query(sqlSelectTK, TenDN, function (er, rs, fields) {
                            if (rs) {
                                const idTK = rs[0].idTK;
                                connection.query(sqlUpdateDG, idDG, (e) => {
                                    if (e) { throw e }
                                });
                                connection.query(sqlUpdateSP2, idSP, (e) => {
                                    if (e) { throw e }
                                });
                                connection.query(sqlInsertGD, [idSP, idTK, NgayDG, GiaTien, ThongTinGD], (e, rsl) => {
                                    if (e) { throw e }
                                    const idGD = rsl.insertId.toString();

                                    trading[parseInt(idGD)] = new CronJob(date, function () {
                                        pool.query(sqlUpdateGD, idGD, (e) => {
                                            if (e) { throw e }
                                        });
                                        pool.query(sqlUpdateSP1, idSP, (e) => {
                                            if (e) { throw e }
                                        });

                                        trading[parseInt(idDG)] = '';
                                    }, null, true);
                                });
                            }
                        });
                    } else {
                        connection.query(sqlUpdateDG, idDG, (e) => {
                            if (e) { throw e }
                        });
                        connection.query(sqlUpdateSP1, idSP, (e) => {
                            if (e) { throw e }
                        });
                    }
                }
            });
            connection.release();
        });
    }

    // [GET] /api/get/all/auction (for home)
    getAuction(req, res, next) {
        const selectSql0 = "select * from sanpham s, daugia d where s.idSP = d.idSP and d.TrangThai = 0";
        const selectSql1 = "select * from sanpham s, daugia d where s.idSP = d.idSP and d.TrangThai = 1";

        pool.getConnection(function (error, connection) {
            if (error) throw error; // not connected!
            connection.query(selectSql0, function (er, results, fields) {
                if (er) {
                    res.status(200).send({ message: "Kết nối DataBase thất bại" });
                } else {
                    if (results) {
                        connection.query(selectSql1, function (err, rs, fields) {
                            if (err) {
                                res.status(200).send({ message: "Kết nối DataBase thất bại" });
                            } else {

                                if (rs) {
                                    res.send({ isComing: results, isHappening: rs });
                                } else {
                                    res.send({ message: "Lấy phiên đấu giá thất bại, lỗi cú pháp!" });
                                }
                            }
                        });
                    } else {
                        res.send({ message: "Lấy phiên đấu giá thất bại, lỗi cú pháp!" });
                    }
                }
            });
            connection.release();
        });
    }

    // [GET] /api/auction/info
    auctionInfo(req, res, next) {

        const sql = "select * from sanpham s, daugia d where s.idSP = d.idSP and idDG = ? ";
        const idDG = req.query.id;

        pool.query(sql, idDG, function (error, results, fields) {
            if (error) {
                res.send({ error: error });
            }
            if (results.length > 0) {
                res.send({
                    highestPrice: results[0].Gia,
                    priceStep: results[0].BuocGia,
                    website: results[0].Website,
                    position: results[0].ViTri,
                    bannerSize: results[0].KichThuoc,
                    urlImage: results[0].HinhAnh,
                    dateTime: results[0].TgBatDau,
                    decription: results[0].MoTa
                });
            } else {
                res.status(200).send({ message: "Sàn đấu giá không tồn tại!" });
            }
        });
    }

    // [GET] /api/get/auction/iscoming (for homepage only)
    getComingAuction(req, res, next) {
        const selectSql0 = "select * from sanpham s, daugia d where s.idSP = d.idSP and d.TrangThai = 0";
        pool.query(selectSql0, function (err, results, fields) {
            if (err) {
                res.status(200).send({ message: "Kết nối DataBase thất bại" });
            } else {
                if (results) {
                    res.send({ isComing: results });
                } else {
                    res.send({ message: "Lấy phiên đấu giá thất bại, lỗi cú pháp!" });
                }
            }
        });
    }

    //[POST] /api/auction/loved
    auctionLoved(req, res, next) {
        const insertSql = 'insert into quantam (idTK, idDG) values (?, ?)';
        const selectSql = 'select * from quantam where idTK = ? and idDG = ?';

        const idTK = req.user[0].idTK;
        const idDG = req.body.idDG;
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(selectSql, [idTK, idDG], function (error, rs, fields) {
                if (rs[0]) {
                    res.status(200).send({ message: "Trận đấu giá này đã được thêm vào quan tâm trước đó" });
                } else {
                    connection.query(insertSql, [idTK, idDG], function (error, results, fields) {
                        if (error) {
                            res.status(200).send({ message: "Sàn đấu giá không tồn tại!" });
                        } console.log(results)
                        res.status(200).send({ message: "Đã thêm vào quan tâm!" });
                    });
                }
            });
        });

    }

    // [GET] /api/my/cart
    myCart(req, res, next) {
        const selectSql = 'select s.ViTri, s.KichThuoc, s.Website, s.HinhAnh, g.idGD, g.NgayDG, g.GiaTien, g.ThongTinGD from sanpham s, giaodich g where s.idSP = g.idSP and g.TrangThai = 0 and idTK = ?';
        const idTK = req.user[0].idTK;
        pool.query(selectSql, idTK, function (error, results, fields) {
            if (error) {
                throw error;
            } else {
                res.send(results);
            }
        });
    }

    //[DELETE] /api/delete/my/cart
    deleteMyCart(req, res, next) {
        const idGD = req.body.idGD; console.log(req.body);
        const sql = 'delete from giaodich where idGD = ?';
        pool.query(sql, idGD, function (error, results, fields) {
            if (error) {
                res.send({ message: "Hóa đơn không tồn tại!" });
            }
            res.send();
        });
    }

    // [GET] /api/my/loved
    myLoved(req, res, next) {
        const selectSql = 'select s.ViTri, s.KichThuoc, s.Website, s.HinhAnh, s.Gia, d.idDG, d.TgBatDau, d.TgDauGia, d.BuocGia, q.idQT from sanpham s, daugia d, quantam q where s.idSP = d.idSP and q.idDG = d.idDG and idTK = ?';
        const idTK = req.user[0].idTK;
        pool.query(selectSql, idTK, function (error, results, fields) {
            if (error) {
                throw error;
            } else {
                res.send(results);
            }
        });
    }

    //[DELETE] /api/delete/my/loved
    deleteMyLoved(req, res, next) {
        const idQT = req.body.idQT;
        const sql = 'delete from quantam where idQT = ?';
        pool.query(sql, idQT, function (error, results, fields) {
            if (error) {
                res.status(200).send({ message: "Sàn đấu giá không tồn tại!" });
            }
            res.send();
        });
    }

    // [GET] /api/my/bill
    getMyBill(req, res, next) {
        const sumSql = 'select sum(GiaTien) as sumGT from auctiondata.giaodich where idTK = ? group by idTK';
        const idTK = req.user[0].idTK;
        pool.query(sumSql, idTK, function (error, results, fields) {
            if (error) {
                throw error;
            } else {
                res.send(results);
            }
        });
    }

    // [GET] /api/search
    search(req, res, next){

    }
}

module.exports = new API();
