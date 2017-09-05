const userInfo = require('../modelFunction/userInfo');

var getUserInfo = async (ctx, next) => {
    var data = await userInfo.getUserInfo()
    console.log(data)
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

var editUserInfo = async (ctx, next) => {
    var _id = ctx.request.body.account,
        avatar = ctx.request.body.avatar,
        blogTitle = ctx.request.body.blogTitle,
        motto = ctx.request.body.motto;
        console.log(ctx.request.body);
    var data = await userInfo.editUserInfo(_id,avatar,blogTitle,motto);
    console.log(data)
    if (data) {
        ctx.response.type = 'application/json';
        ctx.response.body = {
            sta: true,
            info: data
        }
    }
}

module.exports = {
    getUserInfo,
    editUserInfo
}