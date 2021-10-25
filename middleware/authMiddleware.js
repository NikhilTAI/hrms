const jwt=require('jsonwebtoken');
const createError = require('http-errors');
const User = require('../models/userModel');

const checkUser = function (req, res, next) {
    const token = req.headers["authorization"] // || req.headers["x-access-token"];
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, function(err, decodedToken){
            if (err) {
                console.log("ERROR: "+err.message);
                req.userId = null;
                next(createError.Unauthorized("Invalid token"));
            } else {
                // compare jwt in redis
                req.userId = decodedToken.userId;
                // req.userName = decodedToken.userName;
                next();
            }
        });
    } else {
        req.userId = null;
        next();
    }
}

module.exports = checkUser;