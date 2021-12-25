const express = require('express');
const app = express();
const cors = require("cors");
const route = require('./routes');
const helmet = require("helmet");
require('dotenv').config();
const port = parseInt(process.env.PORT);

const socket = require('./app/controllers/Io');
const portSocket = parseInt(process.env.PORT_IO);
const { Server} = require('socket.io');
const http = require('http');
const server = http.createServer(app);
const io = new Server (server, {
    cors: {
        origin: process.env.ORIGIN_PATH,
        method: ["GET", "POST"]
    }
});

app.use(
    cors({
        origin: [process.env.ORIGIN_PATH],
        methods: ['GET','POST','PUT', 'DELETE', 'PATCH'],
        credentials: true,
        exposedHeaders: 'isAuth',
    }
));

if(process.env.NODE_ENV === 'development'){
    const morgan = require("morgan");
    app.use(morgan("combined"));
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());

route(app);
socket(io);
  

app.listen(port, ()=> {
    console.log(`Server is running on: http://localhost:${port} `);
});
server.listen(portSocket, ()=> {
    console.log(`Server socket is running on: http://localhost:${portSocket} `);
});