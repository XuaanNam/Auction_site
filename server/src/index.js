const express = require('express');
const methodOverride = require('method-override');
const app = express();
const port = process.env.port || 5000;
const cors = require("cors");
const morgan = require("morgan");
const { resourceLimits } = require('worker_threads');
const route = require('./routes');
const helmet = require("helmet");
require('dotenv').config();

const socket = require('./app/controllers/Io');
const portSocket = 4000;
const { Server} = require('socket.io');
const http = require('http');
const server = http.createServer(app);
const io = new Server (server, {
    cors: {
        origin: "http://localhost:3000",
        method: ["GET", "POST"]
    }
});

app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: ['GET','POST','PUT', 'DELETE', 'PATCH'],
        credentials: true,
        exposedHeaders: 'isAuth',
    }
));
app.use(morgan("combined"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use(methodOverride('_method'));

route(app);
socket(io);
  

app.listen(port, ()=> {
    console.log(`Server is running on: http://localhost:${port} `);
});
server.listen(portSocket, ()=> {
    console.log(`Server socket is running on: http://localhost:${portSocket} `);
});