const mongoose = require('mongoose');

//report schema
const DesReportSchema = mongoose.Schema({
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
    no:{
        type: Number,
        require: true
    },
    taskList:{
        type: String,
        required:true
    },
    taskDesc:{
        type: String,
        required:true
    },
    hourSpent:{
        type: Number,
        required: true
    },
    status:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('DesReport', DesReportSchema)