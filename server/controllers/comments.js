const comments = require('../modelFunction/comments')
const mongoose=require('mongoose')
const moment = require('moment')

var insert = async (ctx, next) => {
  let date = moment().locale('zh-cn')
  let time = date.format()
  let to_id= ctx.request.body.to_id
  let data = {
    'commerId': ctx.request.body.commerId,
    'to_id':  to_id,
    'replay_comment': ctx.request.body.replay_comment,
    'articleId': ctx.request.body.articleId,
    'time':time,
    'isShow':true,
    'isView':false
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
  let adminId = ctx.request.body.adminId
  let query 
  if (Object.is(adminId, '59321aa8a2f622dfa0121015')) {
    query = {}
  } else {
    query = {
      'articleId':id,
      'isShow':true
    }
  }
  let lists = await comments.commentsList(query)
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

var changeShow = async (ctx, next) => {
  let commentId = ctx.request.body.commentId
  let show = ctx.request.body.show
  console.log(commentId, show)
  let res = await comments.changeShow(commentId,show)
  if (res !== '' && res !== null) {
    ctx.response.type = 'application/json'
    ctx.response.body = {
      sta: true,
      info: res
    }
  } else {
    ctx.response.type = 'application/json'
    ctx.response.body = {
      sta: false,
      info: '出错了'
    }
  }
}

var getUnViewComments = async (ctx, next) => {
  let res = await comments.getUnViewComments()
  if (res !== '' && res !== null) {
    ctx.response.type = 'application/json'
    ctx.response.body = {
      sta: true,
      info: res
    }
  } else {
    ctx.response.type = 'application/json'
    ctx.response.body = {
      sta: false,
      info: '出错了'
    }
  }
}

var ViewedComments = async (ctx, next) => {
  let res = await comments.ViewedComments()
  if (res !== '' && res !== null) {
    ctx.response.type = 'application/json'
    ctx.response.body = {
      sta: true,
      info: 0
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
  getcommentsList,
  changeShow,
  getUnViewComments,
  ViewedComments
}
