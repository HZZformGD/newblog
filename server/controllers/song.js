const song = require('../modelFunction/song');

var getSong = async (ctx, next) => {
  let key = ctx.params.key;
  let data = await song.getId(key);
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
  getSong
}