const comments = require('../models/commentsModel');
const mongoose=require('mongoose');

var insert = (data) => {
  data.to_id = mongoose.Types.ObjectId(data.to_id)
  commentsModel = new comments(data)
  return new Promise(resolve => {
    commentsModel.save((err, res) => {
      if (res) {
        resolve(res)
      } else {
        resolve(err)
      }
    })
  })
}

var commentsList = (id) => {
  return new Promise(resolve => {
    comments.find({articleId:id})
    .lean()
    .populate({path:'commerId',select:'nickname'},{path:'to_id',select:'nickname'})
    .exec((err,res) => {
      if (res) {
        console.log('res',res)
        resolve(res)
      } else {
        console.log('err',err)
        resolve(null)
      }
    })
  })
}

module.exports.insert = insert;
module.exports.commentsList = commentsList;
