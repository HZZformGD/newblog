const mongoose = require('../config/db').mongoose
const connect = require('../config/db').connect



var navSchema=new mongoose.Schema(
    {
        text:String,
        path:String,
    },
    {collection:'navs'}
)

var model=connect.model('navs',navSchema);


module.exports=model