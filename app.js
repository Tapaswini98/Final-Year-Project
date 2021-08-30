require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mysqlDB = require("./database");
const path = require('path');
const uuid = require('uuid/v4');
const session = require("express-session");

const Test = require("./rabbitTest/test.model");
//var amqp = require('amqplib/callback_api');
// const cron = require('node-cron');

//required routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const cityRoutes = require("./routes/city");
const zonePlcLivedataRoutes = require("./routes/zoneplclivedata");
const zonePlcFeedbackRoutes = require("./routes/zoneplcfeedback");
const findRoutes = require("./routes/findrouter");
const masterRoutes = require("./routes/master");
const plcDevices = require("./routes/plcdevices.route");
const app = express();

require('./rabbitSetup/index').config();

// cron.schedule('* * * * *', () => {
//     console.log( "Hi" );
// });

//MongoDB Database
mongoose.connect(process.env.DATABASE,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }).then(() => {
        console.log("DATABASE CONNECTED")
    })
//MySql database
mysqlDB.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("MySQL CONNECTED");
})

//creating session

app.use(session({
    genid: (req) => {
        return uuid() // use UUIDs for session IDs
    },
    key: 'Secret',
    secret: require('crypto').randomBytes(64).toString('hex'),
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        expires: 7000000
    }
}));

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

//using the ejs files
app.set('view engine', 'ejs');

//My routes
app.use("/", userRoutes);
app.use("/", authRoutes);
app.use("/", cityRoutes);
app.use("/", zonePlcLivedataRoutes);
app.use("/", zonePlcFeedbackRoutes);
app.use("/", findRoutes);
app.use("/", masterRoutes);
app.use("/", plcDevices);
//Using static files
app.use(express.static(path.join(__dirname, 'public')));

//Port
const port = process.env.PORT || 3000;

//starting the server
app.listen(port, () => {
    console.log(`app is running at ${port}`);
})
