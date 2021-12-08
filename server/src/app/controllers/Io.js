const pool = require("../models/pool");

function socket(io) {
    // idDG - 1 = data.room - 1 
    let dataRoom = [];
    let listBetHistoryData = [];
    let index = [];
    // idDG = data.room 
    let IntervalId = [];
    let countdown = [];

    io.on("connection", (socket) => {
        console.log(`user connected: ${socket.id}`);

        socket.on('join_room', (data) => {
            socket.join(data);
            console.log(`user id: ${socket.id}, joined room: ${data}`);
        });
        
        socket.on('leave_room', (data) => {
            socket.leave(data);
            console.log(`user id: ${socket.id}, leave room: ${data}`);
        });

        socket.on('setHaftMinLast', (data) => {
            countdown[data.room] = parseInt(data.time);
        });

        socket.on('settimer', (data) => {
            console.log(`user id: ${socket.id} is setting time countdown for room ${data.room}`);
            countdown[data.room] = parseInt(data.time) ? parseInt(data.time) : 15*60;
           
            IntervalId[data.room] = setInterval(() => {  
                if (countdown[data.room] <= 0) {
                    let i = parseInt(data.room)-1;
                    
                    const sqlSelectDG = 'select * from daugia where idDG = ?';
                    const sqlSelectTK = 'select * from taikhoan where TenDN = ?';
                    const sqlUpdateDG = 'update daugia set TrangThai = 2 where idDG = ?';
                    const sqlUpdateSP2 = 'update sanpham set TrangThai = 2 where idSP = ?';
                    const sqlUpdateSP0 = 'update sanpham set TrangThai = 0 where idSP = ?';
                    const sqlInsert = 'insert into giaodich (idSP, idTK, NgayDG, GiaTien, ThongTinGD) value (?, ?, ?, ?, ?)';
                    
                    clearInterval(IntervalId[data.room]);

                    const idDG = data.room
                    let haveWinner = 0;
                    if(dataRoom[i]){haveWinner = 1}
                    var TenDN = '', NgayDG = '', GiaTien = '';
                    if(haveWinner === 1) {
                        TenDN =  dataRoom[i].userWinner;
                        NgayDG = new Date(Date.now());
                        GT = dataRoom[i].highestPrice.split(' ')[0]; 
                        GiaTien = parseInt(GT.split(',')[0] + GT.split(',')[1] + GT.split(',')[2]);
                    }
                   
                    pool.getConnection(function (error, connection) {
                        if (error) throw error; // not connected!
                        connection.query(sqlSelectDG, idDG, function (err, results, fields) { 
                            if(results){ 
                                const idSP = results[0].idSP;

                                if(haveWinner === 1) {
                                    const ThongTinGD = 'Người dùng ' + TenDN + ' Đã chiến thắng sản phẩm có id = ' +
                                    idSP + '. Số tiền: ' + GiaTien;

                                    connection.query(sqlSelectTK, TenDN, function (er, rs, fields) {
                                        if(rs) { 
                                            const idTK = rs[0].idTK;
                                            connection.query(sqlUpdateDG, idDG,(e) => {
                                                if(e) {throw e}
                                            });                                            
                                            connection.query(sqlUpdateSP2, idSP,(e) => {
                                                if(e) {throw e}
                                            });
                                            connection.query(sqlInsert, [idSP, idTK, NgayDG, GiaTien, ThongTinGD],(e) => {
                                                if(e) {throw e}
                                            });
                                        }
                                    });
                                } else {
                                    connection.query(sqlUpdateDG, idDG,(e) => {
                                        if(e) {throw e}
                                    });
                                    connection.query(sqlUpdateSP0, idSP,(e) => {
                                        if(e) {throw e}
                                    });
                                }
                            }
                        });
                        connection.release();
                    });
                } else {
                    countdown[data.room]--; //socket.to(data.room).emit -- io.emit
                    socket.to(data.room).emit('timer', countdown[data.room] );
                }
            }, 1000);
        });

        socket.on('bet_more', (data) => {

            let i = parseInt(data.room)-1;

            if(typeof(index[i])  == "undefined"){ 
                index[i] = 0;
            }

            data.id = ++index[i];
            data.highestPrice = data.highestPrice + " VNĐ"; 
            dataRoom[i] = data;
            if(data.id == 1){
                listBetHistoryData[i] = []; 
            }
            listBetHistoryData[i][data.id-1] = dataRoom[i];
            //console.log({listDataRoom: listBetHistoryData[i]})

            io.in(data.room).emit("receive_data", {state : 1, dataRoom: data, listDataRoom: listBetHistoryData[i]});
            
        });

        socket.on('get_data_room', (data) => {
            let i = parseInt(data.room)-1;

            if (typeof(dataRoom[i])  == "undefined"){
                io.in(data.room).emit("receive_data", {state : 0});
            } 
            else if(countdown[data.room] === 0){
                io.in(data.room).emit("receive_data", {
                    state : 2,
                    dataRoom: dataRoom[i],
                    listDataRoom: listBetHistoryData[i]
                });
            }  
            else {     
                io.in(data.room).emit("receive_data", { 
                    state : 1,
                    dataRoom: dataRoom[i],
                    listDataRoom: listBetHistoryData[i]
                });
            }
        });
        
        socket.on("disconnect", () =>{
            console.log('user disconnected: ',socket.id);
        });
    })
}

module.exports = socket;
