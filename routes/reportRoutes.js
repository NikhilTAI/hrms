const express = require('express');
const router = express.Router();
const DevReport = require('../models/devReportModel');
const BdeReport = require('../models/bdeReportModel');
const createError = require('http-errors');
const { devSchema, bdeSchema } = require('../helpers/validation_schema')

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
            total: reports.length,
            reports: reports
        });
    })
})

// POST report
router.post('/dev', function (req, res, next){
    if (req.userId == null) {
        next(createError(401, "Please login first"))
    }else{
        let validationErrors = [];
        for (let i = 0; i < req.body.length; i++) {
            const {error, value} = devSchema.validate(req.body[i]);
            if (error) {
                validationErrors.push(error);
            }
        }
        if (validationErrors.length > 0) {
            console.log("ValidationErrors :" +validationErrors);
            res.status(400).json({
                status: "fail",
                message: `Validation error`
            });
        } else {
            for (let i = 0; i < req.body.length; i++) {
                // console.log(req.body[i])
                const report = new DevReport({
                    userId: req.userId,
                    userName: req.userName,
                    taskList: req.body[i].taskList,
                    taskDesc: req.body[i].taskDesc,
                    hourSpent: req.body[i].hourSpent,
                    status: req.body[i].status
                });
                report.save(function(err){
                    if(err){
                        console.log(err.message);
                        return next(createError(400, err.message))
                    }
                });
            }
            res.status(200).json({
                status: "success",
                message: `Reports added successfully`
            });
        }
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
            total: reports.length,
            reports: reports
        });
    })
})

// POST report
router.post('/bde', function (req, res, next){
    if (req.userId == null) {
        next(createError(401, "Please login first"))
    }else{
        let validationErrors = [];
        for (let i = 0; i < req.body.length; i++) {
            const {error, value} = bdeSchema.validate(req.body[i]);
            if (error) {
                validationErrors.push(error);
            }
        }
        if (validationErrors.length > 0) {
            console.log("ValidationErrors :" +validationErrors);
            res.status(400).json({
                status: "fail",
                message: `Validation error`
            });
        } else {
            for (let i = 0; i < req.body.length; i++) {
                // console.log(req.body[i])
                const report = new BdeReport({
                    userId: req.userId,
                    userName: req.userName,
                    taskList: req.body[i].taskList,
                    number: req.body[i].number,
                    hourSpent: req.body[i].hourSpent
                });
                report.save(function(err){
                    if(err){
                        console.log(err.message);
                        return next(createError(400, err.message))
                    }
                });
            }
            res.status(200).json({
                status: "success",
                message: `Reports added successfully`
            });
        }
    }
});

module.exports = router;