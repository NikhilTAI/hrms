const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const createError = require('http-errors');

const checkUser = require('./middleware/authMiddleware');

dotenv.config({path:'config.env'});

// connect to db
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('connected to mongodb');
});

// init app
const app = express()

// cookieParser Middleware
// const cookieParser = require("cookie-parser");
// app.use(cookieParser());

// MIDDLEWARES
// CORS middleware
const cors = require('cors');
app.use(cors());
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 
}
app.options('*', cors(corsOptions));
// app.options('*', cors());

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

const auth = require("./routes/authRoutes.js");
const users = require("./routes/userRoutes.js");
const report = require("./routes/reportRoutes.js");

app.use('/users',users);
app.use('/reports',report);
app.use('/',auth);

app.all('*', (req, res, next) => {
    next(createError.NotFound(`${req.originalUrl} not found!`))
});

// error handler
app.use((err, req, res, next) =>{
    res.status(err.status || 500).json({
        status: "fail",
        message: err.message,
    })
})

// start server
const port = process.env.PORT || 5000;
app.listen(port, function(){
    console.log("Server running on "+ port);
})

// TODO
// userneme and email should be uniqe
// designation should only developer/designer/bde
// validation

// auto set jwt var in postman
// check ids of reports/make sure id not already exists

// mail test
// const { sendReportMail } = require('./helpers/sendmail');
// sendReportMail()