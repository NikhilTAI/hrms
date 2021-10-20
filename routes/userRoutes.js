const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

// GET all users
router.get('/', (req, res) => {
    // find User and send
    const projection = {
        __v: false,
        // _id: false,
        password: false
    };
    User.find({}, projection, (err, users) => {
        if (err) {
            console.log(err);
        }
        // console.log(users);
        res.status(200).json({
            status: "success",
            total: users.length,
            users: users
        });
    })
})

module.exports = router;