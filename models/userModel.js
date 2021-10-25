const mongoose = require('mongoose');

//user schema
const UserSchema = mongoose.Schema({
    username:{
        type: String,
        required:[true, "Username is required!"]
    },
    email:{
        type: String,
        required:[true, "Email is required!"]
    },
    designation: {
        type: String
    },
    phone:{
        type: String,
        required: [true, "Phone number is required!"]
    },
    password:{
        type: String,
        required: [true, "Password is required!"]
    }
});

module.exports = mongoose.model('User', UserSchema)