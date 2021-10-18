const mongoose = require('mongoose');
const yup = require('yup');


//usres Schema
const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    }
});

module.exports = new mongoose.model("User", UserSchema);