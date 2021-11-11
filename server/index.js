const express = require('express');
const app = express();
const port = process.env.port || 5000;
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const { resourceLimits } = require('worker_threads');
const route = require('./routes');


app.use(morgan("combined"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded());
app.use(express.json());
app.use(cors());


route(app);




app.listen(port, ()=> {
    console.log(`Server is running on: http://localhost:${port} `);
});