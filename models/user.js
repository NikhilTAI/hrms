var mongoose = require('mongoose');

//user schema
var UserSchema = mongoose.Schema({
    username:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    designation: {
        type: String
    },
    phone:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
    // admin:{
    //     type: Number,
    // }
});

var User = module.exports = mongoose.model('User', UserSchema)