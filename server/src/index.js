const express = require('express');
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const { resourceLimits } = require('worker_threads');
const route = require('./routes');
const helmet = require("helmet");
require('dotenv').config();
const port = parseInt(process.env.PORT);
const paypal = require('paypal-rest-sdk');
paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': process.env.CLIENT_ID,
    'client_secret': process.env.PP_SECRET_KEY
});



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
app.use(morgan("combined"));
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