const mongoose = require('../config/db').mongoose
const connect = require('../config/db').connect


const archiveSchema = new mongoose.Schema({
  title: String,
  time: Date,
  aid: mongoose.Schema.Types.ObjectId,
  createdYear: Number,
  createdMonth: Number
},{collection: 'archives'})

var model=connect.model('archives',archiveSchema);




module.exports = model;
