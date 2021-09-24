var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
// get user model
var User = require('../models/userModel');

router.post('/', function(req, res){
    User.findOne({email:req.body.email}, function(err, user){
        if(err){
            console.log(err);
        }
        if(user){
            // console.log("email already registerd");
            res.status(422).json({ error : "email already registerd"});
        }else{
            var user = new User({
                username: req.body.username,
                email: req.body.email,
                designation: req.body.designation,
                phone: req.body.phone,
                password: req.body.password
            });
            bcrypt.genSalt(10, function(err, salt){
                bcrypt.hash(req.body.password , salt, function(err, hash){
                    if(err){
                        console.log(err);}
                    user.password = hash;
                    user.save(function(err){
                        if(err){
                            console.log(err);
                            res.status(400);
                        }else{
                            res.status(200).json({
                                status: "success",
                                message: `User registerd successfully`
                            });
                        }
                    });
                });
            });
        }
    });
})

// exports
module.exports = router;