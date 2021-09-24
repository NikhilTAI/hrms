const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const morgan = require('morgan');

// connect to db
dotenv.config({path:'config.env'});

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('connected to mongodb');
});

// init app
var app = express()

const cors = require('cors');

// app.options('*', cors()) // include before other routes

app.use(cors({
    origin: ['http://localhost', 'https://www.google.com/'],
    // origin: ['https://www.section.io', 'https://www.google.com/'],
    // origin: "http://localhost",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: true
}));

// Access-Control-Allow-Origin: http://localhost:3000 aa nakhi jo to
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", 'http://localhost:3000');
//     res.header("Access-Control-Allow-Credentials", true);
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//     res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
//     next();
// });

app.use(morgan('tiny'));

// bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// set routes
app.get('/', (req, res) =>{
    res.send("Backend running...")
});

var register = require("./routes/register.js");
var login = require("./routes/login.js");
var users = require("./routes/userRoutes.js");

app.use('/register',register);
app.use('/login',login);
app.use('/users',users);


app.all('*', (req, res, next) => {
    res.status(404).json({
        status: "fail",
        message: `Can't find ${req.originalUrl} on this server!`
    });
});

// start server
var port = process.env.PORT || 5000;
app.listen(port, function(){
    console.log("Server running on "+ port);
})
