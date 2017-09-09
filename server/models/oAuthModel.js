const mongoose = require('../config/db').mongoose
const connect = require('../config/db').connect



const mySchema=new mongoose.Schema(
    {
        nickname:String,
        oauthid:Number,
        avatar:String,
        addtime:Date,
        from:String
    },
        {collection:'oauth'}
);

var model=connect.model('oauth',mySchema);


module.exports=model;