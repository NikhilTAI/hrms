const jwt=require('jsonwebtoken');
const createError = require('http-errors');
const User = require('../models/userModel');

const checkUser = function (req, res, next) {
    // console.log("MIDDLEWARE");
    const token = req.headers["authorization"] // || req.headers["x-access-token"];
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, function(err, decodedToken){
            if (err) {
                console.log("ERROR: "+err.message);
                req.user = null;
                next(createError.Unauthorized("Invalid token"));
            } else {
                User.findById(decodedToken.userId, function (err, user) {
                    if (err) {
                        console.log("ERROR: "+err.message);
                        req.user = null;
                        next(createError.InternalServerError("Some error occured!"));
                    }
                    req.user = user;
                    console.log(req.user._id + " in middleware");
                    next();
                });
            }
        });
    } else {
        req.user = null;
        next();
    }
}

module.exports = checkUser;
// compare jwt in redis
// OR save on db
// const user = User.findOne({ _id: decodedToken.userId, 'tokens.token': token});