const express = require('express');
const router = express.Router();
const DevReport = require('../models/devReportModel');
const BdeReport = require('../models/bdeReportModel');
const createError = require('http-errors');

const projection = {
    __v: false,
    // _id: false,
    userId: false
};

// Dev
// GET all reports
router.get('/dev', (req, res, next) => {
    // find report and send
    DevReport.find({}, projection, (err, reports) => {
        if (err) {
            console.log(err);
        }
        res.status(200).json({
            status: "success",
            reports: reports
        });
    })
})

// POST report
router.post('/dev', function (req, res, next){
    if (req.userId == null) {
        console.log("req.userId: ", req.userId);
        // res.status(400).json({
        //     status: "fail",
        //     message: "Please login first"
        // });
        next(createError(401, "Please login first"))
    }else{
        const report = new DevReport({
            userId: req.userId,
            userName: req.userName,
            taskList: req.body.taskList,
            taskDesc: req.body.taskDesc,
            hourSpent: req.body.hourSpent,
            status: req.body.status
        });
        report.save(function(err){
            if(err){
                console.log(err.message);
                // res.status(400).json({
                //     status: "fail",
                //     message: err.message
                // });
                next(createError(400, err.message))
            }else{
                res.status(200).json({
                    status: "success",
                    message: `Report added successfully`
                });
            }
        });
    }
});

// Bde
// GET all reports
router.get('/bde', (req, res, next) => {
    // find report and send
    BdeReport.find({}, projection, (err, reports) => {
        if (err) {
            console.log(err);
        }
        res.status(200).json({
            status: "success",
            reports: reports
        });
    })
})

// POST report
router.post('/bde', function (req, res, next){
    if (req.userId == null) {
        console.log("req.userId: ", req.userId);
        // res.status(400).json({
        //     status: "fail",
        //     message: "Please login first"
        // });
        next(createError(401, "Please login first"))
    }else{
        const report = new BdeReport({
            userId: req.userId,
            userName: req.userName,
            taskList: req.body.taskList,
            number: req.body.number,
            hourSpent: req.body.hourSpent
        });
        report.save(function(err){
            if(err){
                console.log(err.message);
                // res.status(400).json({
                //     status: "fail",
                //     message: err.message
                // });
                next(createError(400, err.message))
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