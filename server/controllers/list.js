const list = require('../modelFunction/list');
const jwt = require('jsonwebtoken');

var addList = async (ctx, next) => {
    var user_id = ctx.request.body.user_id,
        content = ctx.request.body.content,
        status = ctx.request.body.status,
        Schema = {
            user_id: user_id,
            content: content,
            status: status
        };
    var data = await list.addList(Schema);
    ctx.response.type = 'application/json';
    ctx.response.body = {
        sta: true,
        info: data
    }
}

var getLists = async (ctx, next) => {
    var user_id = ctx.params.id
    var data = await list.getLists(user_id)
    console.log(user_id)
    ctx.response.type = 'application/json'
    ctx.response.body = {
        sta: true,
        info: data
    }
}

var editList = async (ctx, next) => {
    var list_id = ctx.params.list_id,
        status = ctx.params.status;
    status == 'false' ? status = true : status = false;
    var data = await list.editList(list_id, status)
    ctx.response.type = 'application/json'
    ctx.response.body = {
        sta: true,
        info: '更新成功啦'
    }
}

var delList = async (ctx, next) => {
    var list_id = ctx.params.list_id
    var data = await list.delList(list_id)
    console.log(data)
    if (data) {
        ctx.response.type = 'application/json'
        ctx.response.body = {
            sta:true,
            info: '删除成功'
        }
    }
}

module.exports = {
    addList,
    getLists,
    editList,
    delList
}
