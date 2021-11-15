const express = require('express');
const app = express();
const port = process.env.port || 5000;
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const { resourceLimits } = require('worker_threads');
const route = require('./routes');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const helmet = require("helmet");
const connection = require('./app/models/connection');



app.use(cors());
app.use(morgan("combined"));
app.use(express.static("client"));  // đang chỉnh sửa
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(cookieParser())
app.use(helmet());


//app.set('views', path.join(__dirname, 'resources', 'views'))// chưa xong


route(app);


app.listen(port, ()=> {
    console.log(`Server is running on: http://localhost:${port} `);
    connection.connect(function(err) {
        if (err) throw err;
        console.log('connected as id ' + connection.threadId);
      });
});