create database auctiondata
;
use auctiondata
;
create table taikhoan(
idTK int not null primary key AUTO_INCREMENT,
Ho nvarchar(20) not null,
Ten nvarchar(15) not null,
NgaySinh varchar(30),
Email nvarchar(40) not null unique,
TenDN nvarchar(30) not null,
MatKhau nvarchar(200) not null,
SDT varchar(15),
Avt varchar (150),
PhanQuyen boolean default false
);
ALTER TABLE taikhoan AUTO_INCREMENT = 659323832;
insert into taikhoan (Ho, Ten, Email, TenDN, MatKhau) value ('thu nghiem','nguoi dung','thunghiem@ngonday.com','test','$2b$10$vjyo7Vjv/zBJxB0usRFSsO5JH52WixwQtf.dqWUPfVUTwNbParP7m');
drop table taikhoan;
; 
create table the(
idThe int not null primary key AUTO_INCREMENT,
idTK int  not null references taikhoan(idTK),
NganHang nvarchar(20) not null,
ChiNhanh nvarchar(30) not null,
TenChuThe nvarchar(30) not null
)
;
create table sanpham(
idSP int not null primary key AUTO_INCREMENT,
HinhAnh varchar(200) not null,
Website nvarchar(30) not null,
ViTri nvarchar(30) not null,
KichThuoc varchar(30),
Gia double not null,
MoTa text(1000)
) 
; select * from sanpham s, daugia d where s.idSP = d.idSP and idDG = 1;
select * from sanpham ;
drop table sanpham;
create table giaodich(
idGD int not null primary key AUTO_INCREMENT,
idSP int  not null references sanpham(idSP),
idTK int  not null references taikhoan(idTK),
ThongTinGD text(1000)
)
;
create table daugia(
idDG int not null primary key AUTO_INCREMENT,
idSP int  not null references sanpham(idSP),
TgBatDau datetime,
TgDauGia time,
GiaKhoiDiem double,
TrangThai nvarchar(30),
BuocGia double
)
;
create table giohang(
idGH int not null primary key AUTO_INCREMENT,
idTK int  not null references taikhoan(idTK),
idDG int  not null references daugia(idDG)
);
insert into taikhoan value (1,'Pham','Dai','2001/06/20','abcddai123@gmail.com','liluphuong','1234','0377707777', true);
insert into taikhoan value (2,'Tran','Hung','1999/07/26','bocap@gmail.com','sutu','1234abcd','012345', false);
insert into taikhoan value (3,'Le','Minh','2004/02/28','hama@gmail.com','hama','12abcd','0123453532', false);
insert into taikhoan value (4,'Hung','Cuong','1992/03/22','haicau@gmail.com','jack','kimchi','012ss345', false);
insert into taikhoan value (5,'Phan','Lo','2000/08/26','sutuhadong@gmail.com','noitro','quayxe','lelen', false);

insert into sanpham value (1,'url','dogiadung.com','header01','90 x 70',300000,'thue 1 thang');
insert into sanpham value (2,'url','baovietnam.net','side02','90 x 70',450000,'thue 1 thang');
insert into sanpham value (3,'url','chipheo.org','header02','90 x 70',3000000,'thue 1 nam');
insert into sanpham value (4,'url','doboi.vlog','header01','90 x 70',200000,'thue 1 thang');
insert into sanpham value (5,'url','nuocmam.com','footer01','90 x 70',500000,'thue 1 nam');

insert into the value (1,1,'Argibank','Dong Nam A','PHAM HONG DAI');
insert into the value (2,2,'Quoc Te','Dong Nam A','CHI PHEO');

insert into daugia value(3,2,'2021/11/20','00:01:00','45000000','Test',10000000);
insert into daugia value(2,1,'2021/11/21','00:00:15','300000','Test',100000);

insert into giaodich value (1,3,1,'Da Ban');
insert into giaodich value (2,4,1,'Chua Chuyen Tien');

insert into giohang value (1,1,1);
insert into giohang value (2,1,2);
insert into giohang value (3,2,1);
insert into giohang value (4,3,2);
insert into giohang value (5,5,1);
insert into giohang value (6,5,2);

