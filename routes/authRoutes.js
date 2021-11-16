const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
const createError = require('http-errors');
const { userValidSchema } = require('../helpers/validation_schema');
const { sendWelcomeMail } = require('../helpers/sendmail');
const User = require('../models/userModel');

// login
router.post('/login', (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email: email }, function(err, user){
    if (err) { console.log(err); }
    if (!user) {
        next(createError.Unauthorized(`Invalid Credentials`));
    } else if (bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        // store in redis [user.id:token][age]
        res.status(200).json({
            status: "success",
            email: user.email,
            designation: user.designation,
            token: token
        });
    } else {
        next(createError.Unauthorized(`Invalid Credentials`));
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
router.post('/register', function(req, res, next){
    // validate
    const {error, value} = userValidSchema.validate({username: req.body.username, email: req.body.email});
    if (error) {
        console.log(error.message);
        return next(createError.BadRequest(error.message));
    }
    User.findOne({email:req.body.email}, function(err, userFound){
        if (err) { console.log(err); }
        if (userFound) {
            return next(createError.BadRequest(`email already registered`));
        }
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            designation: req.body.designation,
            phone: req.body.phone,
            password: req.body.password
        });
        bcrypt.genSalt(10, function(err, salt){
            bcrypt.hash(req.body.password , salt, function(err, hash){
                if (err) { console.log(err); }
                user.password = hash;
                user.save(function(err){
                    if (err) {
                        console.log(err.message);
                        return next(createError.InternalServerError(err.message));
                    } else {
                        // sendWelcomeMail(user.email)
                        const token = generateToken(user);
                        res.status(200).json({
                            status: "success",
                            email: user.email,
                            designation: user.designation,
                            token: token
                        });
                    }
                });
            });
        });
    });
})

// logout
router.get('/logout', function (req, res) {
    // remove from redis
    res.status(200).json({
        status: "success",
        message: `User logout successfully`
    });
})

module.exports = router;