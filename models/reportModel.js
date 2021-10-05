const mongoose = require('mongoose');
// const User = require('./userModel');

//report schema
const ReportSchema = mongoose.Schema({
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
    taskDesc:{
        type: String,
        required:true
    },
    hourSpend: {
        type: Number,
        required: true
    },
    status:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Report', ReportSchema)