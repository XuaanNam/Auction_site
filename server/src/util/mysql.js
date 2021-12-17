const pool = require('../models/connection');

pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected!

    // Use the connection
    connection.query({
        sql: 'SELECT * FROM `books` WHERE `author` = ?',
        timeout: 40000, // 40s
        values: ['David'],
        },
        function (error, results, fields) {

        // When done with the connection, release it.
        connection.release();

        // Handle error after the release.
        if (error) throw error;
        }
    );
});
pool.end(function (err) {
    // all connections in the pool have ended
  });


// pool.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//     if (error) throw error;
//     console.log('The solution is: ', results[0].solution);
// });

function auctionLoved(req, res, next){
    const insertSql = 'insert into quantam (idTK, idDG) values (?, ?)';
    pool.query(insertSql, [idTK, idDG], function (error, results, fields) {
        if (error) {
            res.status(200).send({ message: "Sàn đấu giá không tồn tại!/đã thêm vào quan tâm trước đó" });
        } 
        res.status(200).send({ message: "Đã thêm vào quan tâm!" });
    });
};



function paymentByPaypal(req, res, next){
    const idTK = req.user[0].idTK;
    const totalUSD = req.body.totalUSD?"30.00":"30.00";
    const listWebsite = req.body.listWebsite?'superp.com':'superp.com';
    const number = req.body.number?"1":"1";
    const create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": `http://localhost:5000/api/paymentSuccess?idTK=${idTK}`,
            "cancel_url": "http://localhost:3000/cart"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": listWebsite,
                    "sku": 'Gồm ' + number + ' sản phẩm',
                    "price": totalUSD,
                    "currency": "USD",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "USD",
                "total": totalUSD
            },
            "description": "Cho nay nhet thang ThongTinGD vao"
        }]
    };
    
    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else { 
            for(let i = 0; i < payment.links.length; i++){
                if(payment.links[i].rel === 'approval_url'){ //console.log(payment)
                    res.send({payment_link: payment.links[i].href});
                }
            }
        }
    });
}


function paymentSuccess(req ,res ){
    const idTK = req.query.idTK
    const updateSql = 'update giaodich set TrangThai = 2 where idTK = ?';
    const payerId = req.query.PayerID
    const paymentId = req.query.paymentId;
    const excute_payment_json={
        "payer_id" : payerId,
        "transactions":[{
            "amount":{
                "currency": "USD",
                "total": "30.00"
            }
        }]
    };
    paypal.payment.execute(paymentId, excute_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            console.log(payment);            
            pool.query(updateSql, idTK, function (error, results, fields) {
                if (error) {
                    throw error;
                } 
                window.location = 'http://localhost:3000/cart';                               
            });
        }
    });
    
};


function storedAuction(req, res, next) {
    const updateSql = "update daugia set TrangThai = 1 where idDG = ?";
    const updateSqlSP = "update sanpham set TrangThai = 1 where idSP = ?";
    const insertSql = "insert into daugia (idSP, TgBatDau, TgDauGia, ThoiHan, BuocGia) values (?, ?, ?, ?, ?)";

    const PQ = req.user[0].PhanQuyen;
    const idSP = req.body.idSP,
        TgBatDau = req.body.TgBatDau,   //2021-11-21T00:00:00 
        TgDauGia = req.body.TgDauGia,
        BuocGia = req.body.BuocGia
        ThoiHan = req.body.ThoiHan

    if (PQ === 0) {
        res.send({ message: "Bạn chưa được cấp quyền admin để thêm game ĐG này!" })
    } else {
        pool.getConnection(function (err, connection) {
            if (err) throw err; // not connected!
            connection.query(insertSql, [idSP, TgBatDau, TgDauGia, ThoiHan, BuocGia], function (err, results, fields) {
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


const [tiGia, setTiGia] = useState('');

axios.get('http://api.exchangeratesapi.io/v1/latest?access_key=fc14a7991276f64ded88e84e9e07e31b')
    .then((res) => {
        if(res.data.success){
            setTiGia((parseInt(res.data.rates.USD)/parseInt(res.data.rates.VND)).toString());
        }
    })


