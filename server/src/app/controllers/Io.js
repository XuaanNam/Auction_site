function socket(io) {

    let dataRoom = [];

    io.on("connection", (socket) => {
        console.log(`user connected: ${socket.id}`);

     
        socket.on('join_room', (data) => {

            socket.join(data);
            console.log(`user id: ${socket.id}, joined room: ${data}`);
        });

        socket.on('bet_more', (data) => {

            // let highest_price = parseInt(data.highestPrice.split(',')[0] +  data.highestPrice.split(',')[1] 
            //                     +  data.highestPrice.split(',')[2]);
            // let room_highest_price = parseInt(dataRoom[parseInt(data.room)].highestPrice.split(',')[0] 
            //                         +  dataRoom[parseInt(data.room)].highestPrice.split(',')[1] 
            //                         +  dataRoom[parseInt(data.room)].highestPrice.split(',')[2]);

            // if(highest_price > room_highest_price){
                let i = parseInt(data.room)-1;
                dataRoom[i] = data;
                io.in(data.room).emit("receive_data", dataRoom[i]);
            // } else {
            //     socket.to(data.room).emit("receive_data", dataRoom);
            // }
            
        });

        socket.on('get_data_room', (data) => {
            let i = parseInt(data.room)-1;
            if (typeof(dataRoom[i])  == "undefined"){
                io.in(data.room).emit("receive_data", false);
            } else {     
                io.in(data.room).emit("receive_data", dataRoom[i]);
            }
        });
        
        socket.on("disconnect", () =>{
            console.log('user disconnected: ',socket.id);
        });
    })
}

module.exports = socket;
