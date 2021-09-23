const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');


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

// bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// set routes
var register = require("./routes/register.js");
var login = require("./routes/login.js");

app.get('/', (req, res) =>{
    res.send("Backend running...")
});
app.use('/register',register);
app.use('/login',login);


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
