const mongoose = require('mongoose');
// const User = require('./userModel');

//report schema
const BdeReportSchema = mongoose.Schema({
    _id:{
        type: String,
        required: [true, 'Id is required.']
    },
    userId:{
        // user reference
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'User should be logged in.']
    },
    userName:{
        type: String,
        // required:true
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
    no:{
        type: Number,
        require: true
    },
    number: {
        type: Number,
        required:true
    },
    hourSpent: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('BdeReport', BdeReportSchema)