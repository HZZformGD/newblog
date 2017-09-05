const mongoose = require('../config/db').mongoose
const connect = require('../config/db').connect



var listSchema=new mongoose.Schema(
    {
        user_id:{type:mongoose.Schema.Types.ObjectId,ref:'users'},
        content:String,
        status:Boolean
    },
    {collection:'lists'}
);

var model=connect.model('lists',listSchema);



module.exports=model;