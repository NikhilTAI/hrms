const mongoose = require('mongoose');
// const User = require('./userModel');

//report schema
const ReportSchema = mongoose.Schema({
    user:{
        // user reference
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'User should be logged in.']
    },
    date:{
        type: Date,
        default: Date.now,
        required:true
    },
    task:{
        type: String,
        required:true
    },
    hourSpend: {
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Report', ReportSchema)