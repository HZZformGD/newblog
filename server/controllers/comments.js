const comments = require('../modelFunction/comments');
const mongoose=require('mongoose');

var insert = async (ctx, next) => {
  let date = new Date()
  let time = date.toLocaleString()
  let to_id= ctx.request.body.to_id
  if (typeof to_id === 'string') {
    to_id = Number.parseInt(to_id)
    to_id = mongoose.Types.ObjectId(to_id)
  } else {
    to_id = mongoose.Types.ObjectId(to_id)
  }

  let data = {
    'commerId': ctx.request.body.commerId,
    'to_id':  to_id,
    'replay_comment': ctx.request.body.replay_comment,
    'articleId': ctx.request.body.articleId,
    'time':time
  }
  let res = await comments.insert(data)
  console.log(res)
  if (res != '') {
    ctx.response.type = 'application/json'
    ctx.response.body = {
      sta: true,
      info: '回复成功'
    }
  } else {
    ctx.response.type = 'application/json'
    ctx.response.body = {
      sta: false,
      info: '出错了'
    }
  }
}

var getcommentsList = async (ctx, next) => {
  let id = ctx.request.body.articleId 
  id = mongoose.Types.ObjectId(id)
  let lists = await comments.commentsList(id)
  if (lists !== '' && lists !== null) {
    ctx.response.type = 'application/json'
    ctx.response.body = {
      sta: true,
      info: lists
    }
  } else {
    ctx.response.type = 'application/json'
    ctx.response.body = {
      sta: false,
      info: '出错了'
    }
  }
}

module.exports = {
  insert,
  getcommentsList
}
