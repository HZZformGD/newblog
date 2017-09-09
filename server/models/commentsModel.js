const mongoose = require('../config/db').mongoose
const connect = require('../config/db').connect

const commentsSchema = new mongoose.Schema(
    {
        commerId: {type:mongoose.Schema.Types.ObjectId,ref:'oauth'},
        to_id: {type:mongoose.Schema.Types.ObjectId,ref:'oauth'},
        replay_comment: String,
        articleId: {type:mongoose.Schema.Types.ObjectId,ref:'articles'},
        time: Date,
        isShow: Boolean,
        isView: Boolean
    },
    {collection:'comments'}
)

var model=connect.model('comments',commentsSchema);



module.exports = model;