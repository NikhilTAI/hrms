const jwt=require('jsonwebtoken');
const User = require('../models/userModel');

const isAuth = function (req, res, next) {
    // check jwt
}

const checkUser = function (req, res, next) {
    const token = req.cookies.jwt;
    
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, function(err, decodedToken){
            if (err) {
                console.log(err);
                res.locals.user = null;
                next();
            } else {
                res.locals.userid = decodedToken.userid;
                console.log("res.locals.userid: ",res.locals.userid);
                next();
            }
        });
    } else {
        res.locals.user = null;
        next();
    }
}

module.exports = checkUser;