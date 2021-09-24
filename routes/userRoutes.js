var express = require('express');
const router = express.Router();
var User = require('../models/userModel');

// GET all users
router.get('/', (req, res) => {
    // find User and send
    var usersProjection = { 
        __v: false,
        // _id: false,
        password: false
    };
    User.find({},usersProjection, (err, users) => {
        if (err) {
            console.log(err);
        }
        // console.log(users);
        res.status(200).json({
            status: "success",
            users: users
          });
    })
})

module.exports = router;