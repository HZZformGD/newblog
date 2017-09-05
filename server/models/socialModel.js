const mongoose = require('../config/db').mongoose
const connect = require('../config/db').connect



var socialSchema=new mongoose.Schema(
    {
        src: String,
        path: String
    },
    {collection:'socials'}
)

var model=connect.model('socials',socialSchema);


module.exports=model