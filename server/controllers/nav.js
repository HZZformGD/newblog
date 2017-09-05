const nav = require('../modelFunction/nav');

var getNav = async (ctx, next) => {
    var data = await nav.getnav()
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

var addNav = async (ctx, next) => {
    let path = ctx.request.body.path
        text = ctx.request.body.text;
    let data = await nav.addNav(path, text)
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

var removeNav = async (ctx, next) => {
    let id = ctx.params.id
    let data = await nav.removeNav(id)
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
    getNav,
    addNav,
    removeNav
}