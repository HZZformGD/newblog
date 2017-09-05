const jwt = require('jsonwebtoken');

var verify = async (ctx, next) => {
    console.log(ctx.request.url)
    var token = ctx.request.body.access_token
    if (token) {
        var ver = await jwt.verify(token, 'vue-koa-demo');
        ctx.response.type = 'application/json';
        console.log(ver);
        ctx.response.body = {
            sta:true,
            info:ver
        }
    } else {
        ctx.response.type = 'application/json'
        ctx.response.body = {
            sta: false,
            info: '非法登录'
        }
    }

}

module.exports = {
    verify
}