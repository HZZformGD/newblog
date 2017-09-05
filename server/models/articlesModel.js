const mongoose = require('../config/db').mongoose
const connect = require('../config/db').connect

const articleSchema = new mongoose.Schema(
    {
        title: String,
        date: Date,
        content: String,
        author: String,
        sourceContent: String,
        types: Array
    },
    {collection:'articles'}
)

var model=connect.model('articles',articleSchema);



module.exports = model;