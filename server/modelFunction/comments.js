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

var commentsList = (query) => {
  return new Promise(resolve => {
    comments.find(query)
    .lean()
    .sort({ time: 1 })
    .populate([{path:'commerId',select:'nickname avatar'},{path:'to_id',select:'nickname avatar'},{path:'articleId',select:'title'}])
    .exec((err,res) => {
      if (res) {
        resolve(res)
      } else {
        console.log('err',err)
        resolve(null)
      }
    })
  })
}

var changeShow = (id,show)  => {
  return new Promise(resolve => {
    comments.findByIdAndUpdate(
      {_id:id},
      {$set: {isShow:show}},
      {new: true},
      (err, res) => {
        if (err) {
          console.log(err)
          resolve(err)
        } else {
          resolve(res)
        }
      }
    )
  })
}

var getUnViewComments = () => {
  return new Promise(resolve => {
    comments.where({isView:false}).count((err,res) => {
      if (err) {
        console.log(err)
      } else {
        console.log('count is ,' + res)
        resolve(res)
      }
    })
  })
}

var ViewedComments = () => {
  return new Promise(resolve => {
    comments.update(
      {isView:false},
      {isView:true},
      (err, res) => {
        if (err) {
          console.log(err)
          resolve(err)
        } else {
          resolve(res)
        }
      }
    )
  })
}

module.exports.insert = insert
module.exports.commentsList = commentsList
module.exports.changeShow = changeShow
module.exports.getUnViewComments = getUnViewComments
module.exports.ViewedComments = ViewedComments