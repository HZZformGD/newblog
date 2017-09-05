const mongoose = require('../config/db').mongoose
const connect = require('../config/db').connect



const mySchema=new mongoose.Schema(
    {
        _id:String,
        name:String,
        blogTitle:String,
        avatar:String,
        motto:String
    },
    {collection:'userinfo'}
    );

var model=connect.model('userinfo',mySchema);


module.exports=model;