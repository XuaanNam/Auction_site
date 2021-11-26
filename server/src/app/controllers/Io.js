function socket(io) {

    let dataRoom = [];
    let listBetHistoryData = [];
    let index = [];

    //countdown
    let countdown = [];

    io.on("connection", (socket) => {
        //console.log(`user connected: ${socket.id}`);

        socket.on('join_room', (data) => {
            socket.join(data);
            //console.log(`user id: ${socket.id}, joined room: ${data}`);
        });
        
        socket.on('leave_room', (data) => {
            socket.leave(data);
            //console.log(`user id: ${socket.id}, leave room: ${data}`);
        });

        socket.on('setHaftMinLast', (data) => {
            countdown[data.room] = parseInt(data.time);
        });

        socket.on('settimer', (data) => {
            //console.log(`user id: ${socket.id} is setting time countdown`);
            countdown[data.room] = parseInt(data.time) ? parseInt(data.time) : 15*60;
            setInterval( () => {  
                if (countdown[data.room] <= 0) {
                    return;
                } else {
                    countdown[data.room]--;
                    socket.to(data.room).emit('timer', countdown[data.room] );
                }
            }, 1000);
        });

        socket.on('bet_more', (data) => {

            // let highest_price = parseInt(data.highestPrice.split(',')[0] +  data.highestPrice.split(',')[1] 
            //                     +  data.highestPrice.split(',')[2]);
            // let room_highest_price = parseInt(dataRoom[parseInt(data.room)].highestPrice.split(',')[0] 
            //                         +  dataRoom[parseInt(data.room)].highestPrice.split(',')[1] 
            //                         +  dataRoom[parseInt(data.room)].highestPrice.split(',')[2]);

            // if(highest_price > room_highest_price){
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

                io.in(data.room).emit("receive_data", {dataRoom: data, listDataRoom: listBetHistoryData[i]});
            // } else {
            //     socket.to(data.room).emit("receive_data", dataRoom);
            // }
            
        });

        socket.on('get_data_room', (data) => {
            let i = parseInt(data.room)-1;

            if (typeof(dataRoom[i])  == "undefined"){
                io.in(data.room).emit("receive_data", false);
            } else {     
                io.in(data.room).emit("receive_data", { 
                    dataRoom: dataRoom[i],
                    listDataRoom: listBetHistoryData[i]
                });
            }
        });
        
        socket.on("disconnect", () =>{
            //console.log('user disconnected: ',socket.id);
        });
    })
}

module.exports = socket;
