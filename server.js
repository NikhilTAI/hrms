const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const checkUser = require('./middleware/authMiddleware');

// connect to db
dotenv.config({path:'config.env'});

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('connected to mongodb');
});

// init app
const app = express()

// cookieParser Middleware
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// MIDDLEWARES
// CORS middleware
const cors = require('cors');
app.use(cors());
app.options('*', cors()) // include before other routes

const morgan = require('morgan');
app.use(morgan('tiny'));

// bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// set routes
app.all('*', checkUser);
app.get('/', (req, res) =>{
    res.send("Backend running...")
});

// const register = require("./routes/registerRoute.js");
// const login = require("./routes/loginRoute.js");
const auth = require("./routes/authRoutes.js");
const users = require("./routes/userRoutes.js");
const report = require("./routes/reportRoutes.js");

// app.use('/register',register);
// app.use('/login',login);
app.use('/users',users);
app.use('/reports',report);
app.use('/',auth);


app.all('*', (req, res, next) => {
    res.status(404).json({
        status: "fail",
        message: `Can't find ${req.originalUrl} on this server!`
    });
});

// start server
const port = process.env.PORT || 5000;
app.listen(port, function(){
    console.log("Server running on "+ port);
})
