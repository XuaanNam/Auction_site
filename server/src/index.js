const express = require('express');
const app = express();
const port = process.env.port || 5000;
const cors = require("cors");
const morgan = require("morgan");
const { resourceLimits } = require('worker_threads');
const route = require('./routes');
const helmet = require("helmet");
require('dotenv').config();


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


route(app);


app.listen(port, ()=> {
    console.log(`Server is running on: http://localhost:${port} `);
});