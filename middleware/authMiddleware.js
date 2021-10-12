const jwt=require('jsonwebtoken');
const User = require('../models/userModel');

const checkUser = function (req, res, next) {
    // const token = req.cookies.jwt;
    const token = req.headers["x-access-token"] || req.headers["authorization"];
    // console.log("token: ",token);
    // console.log("req.headers: ",req.headers);
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, function(err, decodedToken){
            if (err) {
                console.log(err);
                req.userId = null;
                next();
            } else {
                req.userId = decodedToken.userId;
                req.userName = decodedToken.userName;
                console.log("req.userid: ",req.userId);
                next();
            }
        });
    } else {
        req.userId = null;
        next();
    }
}

module.exports = checkUser;