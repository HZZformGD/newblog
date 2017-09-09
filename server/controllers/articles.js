const articles = require('../modelFunction/articles');
const moment =require('moment');


var getArticles = async (ctx, next) => {
    var limit = Number(ctx.params.limit) || 1;
    var skip = Number(ctx.params.skip) || 1;
    var total = await articles.count();
    var data = await articles.getArticles(limit, skip);
    if (data) {
        ctx.response.type = 'application/json';
        ctx.response.body = {
            sta: true,
            info: data,
            total: total
        }
    } else {
        ctx.response.type = 'application/json';
        ctx.response.body = {
            sta: false,
            info: '没找到'
        }
    }
}

var getArticlesById = async (ctx, next) => {
    var articleId = ctx.params.id
    var data = await articles.getArticlesById(articleId)
    if (data) {
        ctx.response.type = 'application/json';
        ctx.response.body = {
            sta: true,
            info: data,
        }
    } else {
        ctx.response.type = 'application/json';
        ctx.response.body = {
            sta: false,
            info: '没找到'
        }
    }
}

var searchByKey = async (ctx, next) => {
    var key = ctx.params.key;
    var limit = Number(ctx.params.limit) || 1;
    var skip = Number(ctx.params.skip) || 1;
    key = new RegExp(key, 'i');
    var data = await articles.searchByKey(key, skip, limit);
    if (data) {
        ctx.response.type = 'application/json';
        ctx.response.body = {
            sta: true,
            info: data,
        }
    } else {
        ctx.response.type = 'application/json';
        ctx.response.body = {
            sta: false,
            info: '没找到'
        }
    }
}

var getArchive = async (ctx, next) => {
    var data = await articles.getArchive()
    if (data) {
        ctx.response.type = 'application/json';
        ctx.response.body = {
            sta: true,
            info: data,
        }
    } else {
        ctx.response.type = 'application/json';
        ctx.response.body = {
            sta: false,
            info: '没找到'
        }
    }
}

var delArticlesById = async (ctx, next) => {
    let id = ctx.params.id
    let data = await articles.delArticlesById(id)
    let res = await articles.delArchiveById(id)
    if (data && res) {
        ctx.response.type = 'application/json';
        ctx.response.body = {
            sta: true,
            info: res,
        }
    } else {
        ctx.response.type = 'application/json';
        ctx.response.body = {
            sta: false,
            info: '没找到'
        }
    }
}

var addArticles = async (ctx, next) => {

    let title = ctx.request.body.title
    let content = ctx.request.body.content
    let sourceContent = ctx.request.body.sourceContent
    let date = moment().locale('zh-cn')
    let createTime = date.format()
    let createYear = date.year()
    let createMonth = date.month()+1
    let types = ctx.request.body.types
    types = types.split('；')
    console.log(typeof types)
    let data = await articles.addArticles(title, content, types, sourceContent, createTime)


    if (data) {
        let id = (data._id)
        let archive = await articles.addArchive(title, createTime, createYear, createMonth, id)
        if (archive) {
            ctx.response.type = 'application/json';
            ctx.response.body = {
                sta: true,
                info: archive,
            }
        } else {
            ctx.response.type = 'application/json';
            ctx.response.body = {
                sta: false,
                info: '没找到'
            }
        }
    } else {
        ctx.response.type = 'application/json';
        ctx.response.body = {
            sta: false,
            info: '没找到'
        }
    }
}

var editArticlesById = async (ctx, next) => {
    let id = ctx.request.body._id
    let title = ctx.request.body.title
    let content = ctx.request.body.content
    let types = ctx.request.body.types
    let sourceContent = ctx.request.body.sourceContent
    console.log(id,'+',title,'+',types,'+',content,'+',sourceContent)
    let data = await articles.editArticlesById(id, title, content, types, sourceContent)
    let res = await articles.editArchiveById(id, title)
    if (data && res) {
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
    getArticles,
    getArticlesById,
    searchByKey,
    getArchive,
    delArticlesById,
    addArticles,
    editArticlesById
}