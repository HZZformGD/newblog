const mongoose = require('../config/db').mongoose
const connect = require('../config/db').connect



const mySchema=new mongoose.Schema(
    {
        account:{type:String, ref:'userinfo'},
        password:String
    },
        {collection:'users'}
);

var model=connect.model('users',mySchema);


module.exports=model;