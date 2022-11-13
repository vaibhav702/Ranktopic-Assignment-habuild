const mongoose = require("mongoose")
const bcrypt=require("bcrypt")
const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true,
        trim:true
    },
    lastName: {
        type: String,
        required: true,
        trim:true
    },

    isAdmin:{
        type: Boolean,
        default:false,
        trim:true
    },
    email: {
        type: String,
        required: true,
        lowercase:true,
        unique: true,
        trim:true

    },
    password: {
        type: String,
        required: true,
        min: 8 , 
        max: 15,
        trim:true
    }


},{timestamps:true})

module.exports = mongoose.model("user", userSchema)
