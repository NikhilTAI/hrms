const express = require('express');
const router = express.Router();
const Report = require('../models/reportModel');
// const User = require('../models/userModel');

// GET all reports
router.get('/', (req, res) => {
    // find report and send
    const projection = {
        __v: false,
        // _id: false,
        user: false
    };
    Report.find({}, projection, (err, reports) => {
        if (err) {
            console.log(err);
        }
        // console.log(users);
        res.status(200).json({
            status: "success",
            reports: reports
        });
    })
})

// POST report
router.post('/', function (req, res){
    if (res.locals.userId == null) {
        console.log("res.locals: ", res.locals.userId);
        res.status(400).json({
            status: "fail...",
            message: "Please login first"
        });
    }else{
        const report = new Report({
            userId: res.locals.userId,
            userName: res.locals.userName,
            taskList: req.body.taskList,
            taskDesc: req.body.taskDesc,
            hourSpend: req.body.hourSpend,
            status: req.body.status
        });
        report.save(function(err){
            if(err){
                console.log(err.message);
                res.status(400).json({
                    status: "fail",
                    message: err.message
                });
            }else{
                res.status(200).json({
                    status: "success",
                    message: `Report added successfully`
                });
            }
        });
    }
});

module.exports = router;