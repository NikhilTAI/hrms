const mongoose = require('mongoose');
// const User = require('./userModel');

//report schema
const BdeReportSchema = mongoose.Schema({
    userId:{
        // user reference
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'User should be logged in.']
    },
    userName:{
        type: String,
        required:true
    },
    date:{
        type: Date,
        default: Date.now,
        required:true
    },
    taskList:{
        type: String,
        required:true
    },
    number:{
        type: Number,
        required:true
    },
    hourSpent: {
        type: Number,
        required: true
    },
    // status:{
    //     type: String,
    //     required: true
    // }
});

module.exports = mongoose.model('BdeReport', BdeReportSchema)