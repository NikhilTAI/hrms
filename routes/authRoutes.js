const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');

const User = require('../models/userModel');
// const { config } = require('dotenv');

// login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email: email }, function(err, user){
    if (err) {
        console.log(err);
    }
    if(!user){
        res.status(400).json({ message: "Invalid Credentials" });
    } else if (bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        // res.cookie ('jwt',token,{
        //   maxAge: 1000*60*60*24*90, //"90d in ms"
        //   // secure: true,
        //   httpOnly: true
        // })
        res.status(200).json({
            status: "success",
            email: user.email,
            token: token
        });
    } else {
        res.status(401).json({ message: "Invalid Credentials" });
    }
  })
});

function generateToken(user) {
  const payload = {
    userId: user.id,
    userName: user.username
  };
  const options = {
    expiresIn: "90d",
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, options);

  return token;
}

// Register
router.post('/register', function(req, res){
    User.findOne({email:req.body.email}, function(err, user){
        if(err){
            console.log(err);
        }
        if(user){
            // console.log("email already registerd");
            res.status(422).json({ error : "email already registerd"});
        }else{
            const user = new User({
                username: req.body.username,
                email: req.body.email,
                designation: req.body.designation,
                phone: req.body.phone,
                password: req.body.password
            });
            bcrypt.genSalt(10, function(err, salt){
                bcrypt.hash(req.body.password , salt, function(err, hash){
                    if(err){console.log(err);}
                    user.password = hash;
                    user.save(function(err){
                        if(err){
                            console.log(err);
                            res.status(400).json({
                                status: "fail",
                                message: err.message
                            });
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

// logout
router.get('/logout', function (req, res) {
    // res.cookie ('jwt','', {maxAge: 1})
    // add this token to blacklist until they expire
    res.status(200).json({
        status: "success",
        message: `User logout successfully`
    });
})

module.exports = router;