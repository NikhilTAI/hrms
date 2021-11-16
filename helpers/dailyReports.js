const User = require('../models/userModel');
const DevReport = require('../models/devReportModel');
const DesReport = require('../models/desReportModel');
const BdeReport = require('../models/bdeReportModel');

const projection = {
    __v: false,
    // _id: false,
    // userId: false
};

const reportsByDateDev = async (start, end) => {
    // list of users
    const devList = await User.find({designation:"developer"})
    let reports = {}
    for (let i = 0; i < devList.length; i++) {
        const userId = devList[i]._id;
        const userName = devList[i].username;
        await DevReport.find({
            date: {
                $gte: start,
                $lt: end
            }, userId
        }, projection, (err, tasks) => {
            if (err) { console.log(err); }
            reports[userName] = tasks;
        })
    }
    return reports;
}

const reportsByDateDes = async (start, end) => {
    // list of users
    const desList = await User.find({designation:"designer"})
    let reports = {}
    for (let i = 0; i < desList.length; i++) {
        const userId = desList[i]._id;
        const userName = devList[i].username;
        await DesReport.find({
            date: {
                $gte: start,
                $lt: end
            }, userId
        }, projection, (err, tasks) => {
            if (err) { console.log(err); }
            reports[userName] = tasks;
        })
    }
    return reports;
}

const reportsByDateBde = async (start, end) => {
    // list of users
    const bdeList = await User.find({designation:"bde"})
    let reports = {}
    for (let i = 0; i < bdeList.length; i++) {
        const userId = bdeList[i]._id;
        const userName = devList[i].username;
        await BdeReport.find({
            date: {
                $gte: start,
                $lt: end
            }, userId
        }, projection, (err, tasks) => {
            if (err) { console.log(err); }
            reports[userName] = tasks;
        })
    }
    return reports;
}

module.exports = {
    reportsByDateDev,
    reportsByDateDes,
    reportsByDateBde
}