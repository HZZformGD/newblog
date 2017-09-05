const social = require('../modelFunction/social');

var getSocial = async (ctx, next) => {
  let data = await social.getSocial()
  if (data) {
    ctx.response.type = 'application/json';
    ctx.response.body = {
      sta: true,
      info: data
    }
  } else {
    ctx.response.type = 'application/json';
    ctx.response.body = {
      sta: false,
      info: '没找到'
    }
  }
}

var removeSocial = async (ctx, next) => {
  let id = ctx.params.id
  let data = await social.removeSocial(id)
  if (data) {
    ctx.response.type = 'application/json';
    ctx.response.body = {
      sta: true,
      info: data
    }
  } else {
    ctx.response.type = 'application/json';
    ctx.response.body = {
      sta: false,
      info: '没找到'
    }
  }
}

var addSocial = async (ctx, next) => {
  let src = ctx.request.body.src,
      path = ctx.request.body.path;
  let data = await social.addSocial(src, path)
  if (data) {
    ctx.response.type = 'application/json';
    ctx.response.body = {
      sta: true,
      info: data
    }
  } else {
    ctx.response.type = 'application/json';
    ctx.response.body = {
      sta: false,
      info: '没找到'
    }
  }
}

module.exports = {
  getSocial,
  removeSocial,
  addSocial
}