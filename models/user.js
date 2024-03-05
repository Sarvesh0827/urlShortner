const mongoose =require('mongoose');
const userSchmea =  new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    }
},{timestamps:true});

const User =mongoose.model("user",userSchmea);
module.exports= User;