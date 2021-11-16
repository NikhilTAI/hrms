const express = require('express');
const router = express.Router();
const DevReport = require('../models/devReportModel');
const DesReport = require('../models/desReportModel');
const BdeReport = require('../models/bdeReportModel');
const User = require('../models/userModel');
const { reportsByDateDev, reportsByDateDes, reportsByDateBde } = require('../helpers/dailyReports');
const createError = require('http-errors');
const { devValidSchema, desValidSchema, bdeValidSchema } = require('../helpers/validation_schema');
const { sendReportMail } = require('../helpers/sendmail');

const projection = {
    __v: false,
    // _id: false,
    // userId: false
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
    console.log("POST /dev");
    if (req.user == null) {
        console.log(req.user + "POST dev");
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
                userId: req.user._id,
                userName: req.user.userName,
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
    if (req.user == null) {
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
                userId: req.user._id,
                userName: req.user.userName,
                _id: req.body[i].id,
                taskList: req.body[i].taskList,
                number: req.body[i].number,
                no: req.body[i].no,
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

// Des
// GET all reports
router.get('/des', (req, res, next) => {
    // find report and send
    DesReport.find({}, projection, (err, reports) => {
        if (err) { console.log(err); }
        res.status(200).json({
            status: "success",
            total: reports.length,
            reports: reports
        });
    })
})

// POST report
router.post('/des',async function (req, res, next){
    if (req.user == null) {
        return next(createError(401, "Please login first"))
    }
    let validationErrors = [];
    for (let i = 0; i < req.body.length; i++) {
        const {error, value} = desValidSchema.validate(req.body[i]);
        if (error) { validationErrors.push(error); }
    }
    if (validationErrors.length > 0) {
        console.log("ValidationErrors :" +validationErrors);
        return next(createError.BadRequest(`Validation error`));
    }
    try {
        for (let i = 0; i < req.body.length; i++) {
            const report = new DesReport({
                userId: req.user._id,
                userName: req.user.userName,
                _id: req.body[i].id,
                no: req.body[i].no,
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

// Get reports by date
router.get('/:date?', async (req, res) => {
    // start and end of day
    const start = new Date(req.params.date || new Date().toJSON().slice(0, 10));
    start.setHours(0,0,0,0);
    const end = new Date(req.params.date || new Date().toJSON().slice(0, 10));
    end.setHours(23,59,59,999);
    // console.log("start: "+ start);
    // console.log("end: "+ end);

    const devReports = await reportsByDateDev(start, end);
    const desReports = await reportsByDateDes(start, end);
    const bdeReports = await reportsByDateBde(start, end);
    // console.log([devReports, desReports, bdeReports]);
    res.json({devReports, desReports, bdeReports});

})

module.exports = router;