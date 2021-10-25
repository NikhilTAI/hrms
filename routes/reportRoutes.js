const express = require('express');
const router = express.Router();
const DevReport = require('../models/devReportModel');
const BdeReport = require('../models/bdeReportModel');
const createError = require('http-errors');
const { devValidSchema, bdeValidSchema } = require('../helpers/validation_schema');

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
        if (err) { console.log(err); }
        res.status(200).json({
            status: "success",
            total: reports.length,
            reports: reports
        });
    })
})

// POST report
router.post('/dev',async function (req, res, next){
    if (req.userId == null) {
        return next(createError(401, "Please login first"))
    }
    let validationErrors = [];
    for (let i = 0; i < req.body.length; i++) {
        const {error, value} = devValidSchema.validate(req.body[i]);
        if (error) { validationErrors.push(error); }
    }
    if (validationErrors.length > 0) {
        console.log("ValidationErrors :" +validationErrors);
        return next(createError.BadRequest(`Validation error`));
    }
    try {
        for (let i = 0; i < req.body.length; i++) {
            const report = new DevReport({
                userId: req.userId,
                userName: req.userName,
                _id: req.body[i].id,
                taskList: req.body[i].taskList,
                taskDesc: req.body[i].taskDesc,
                hourSpent: req.body[i].hourSpent,
                status: req.body[i].status
            });
            await report.save();
        }
        res.status(200).json({
            status: "success",
            message: `Reports added successfully`
        })
    } catch (error) {
        if (error.code === 11000) {
            console.log("error...."+error);
            next(createError.BadRequest(`Duplicate key error. id: `+ error.keyValue._id))
            // next(createError.BadRequest(`Duplicate key error. `+JSON.stringify(error.keyValue)))
        } else {
            console.log("error...."+error);
            next(createError.InternalServerError(`Oops! an error occurred.`))
        }
    }
});

// Bde
// GET all reports
router.get('/bde', (req, res, next) => {
    // find report and send
    BdeReport.find({}, projection, (err, reports) => {
        if (err) { console.log(err); }
        res.status(200).json({
            status: "success",
            total: reports.length,
            reports: reports
        });
    })
})

// POST report
router.post('/bde',async function (req, res, next){
    if (req.userId == null) {
        return next(createError(401, "Please login first"))
    }
    let validationErrors = [];
    for (let i = 0; i < req.body.length; i++) {
        const {error, value} = bdeValidSchema.validate(req.body[i]);
        if (error) { validationErrors.push(error); }
    }
    if (validationErrors.length > 0) {
        console.log("ValidationErrors :" +validationErrors);
        return next(createError.BadRequest(`Validation error`));
    }
    try {
        for (let i = 0; i < req.body.length; i++) {
            const report = new BdeReport({
                userId: req.userId,
                userName: req.userName,
                _id: req.body[i].id,
                taskList: req.body[i].taskList,
                number: req.body[i].number,
                hourSpent: req.body[i].hourSpent
            });
            await report.save();
        }
        res.status(200).json({
            status: "success",
            message: `Reports added successfully`
        })
    } catch (error) {
        if (error.code === 11000) {
            console.log("error...."+error);
            next(createError.BadRequest(`Duplicate key error. id: `+ error.keyValue._id))
            // next(createError.BadRequest(`Duplicate key error. `+JSON.stringify(error.keyValue)))
        } else {
            console.log("error...."+error);
            next(createError.InternalServerError(`Oops! an error occurred.`))
        }
    }
});

module.exports = router;