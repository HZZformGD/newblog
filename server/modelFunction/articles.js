const articles = require('../models/articlesModel');
const archive = require('../models/archiveModel');


var getArticles = function (limit, skip) {
    return new Promise(resolve => {
        articles.find({})
            .skip((skip - 1) * limit)
            .sort({ date: -1 })
            .limit(limit)
            .lean()
            .exec(function (err, res) {
                if (res) {
                    resolve(res)
                }
                else {
                    resolve(null)
                }
            })
    })

}

var count = function () {
    return new Promise(resolve => {
        articles.count(function (err, res) {
            resolve(JSON.stringify(res))
        })
    })
}

var getArticlesById = function (id) {
    console.log(id)
    return new Promise(resolve => {
        articles.findById(id, { title: 1, content: 1, types: 1 })
            .lean()
            .exec(function (err, res) {
                if (res) {
                    resolve(res)
                }
                else {
                    resolve(null)
                }
            })
    })
}

var searchByKey = function (key, skip, limit) {
    return new Promise(resolve => {
        articles.find({ 'content': key })
            .skip((skip - 1) * limit)
            .limit(limit)
            .sort({ date: -1 })
            .lean()
            .select({ 'sourceContent': 0 })
            .exec(function (err, res) {
                if (res) {
                    resolve(res)
                }
            })
    })
}

var addArchive = function (title, createTime, createYear, createMonth, id) {
    let schema = {
        title: title,
        time: createTime,
        createdYear: createYear,
        createdMonth: createMonth,
        aid: id
    }
    console.log(schema)
    let add = new archive(schema)
    return new Promise(resolve => {
        add.save(function (err, res) {
            if (res) {
                resolve(res)
            } 
            else {
                resolve(null)
            }
        })
    })
}

var delArchiveById = function(id) {
    return new Promise(resolve => {
        archive.findOneAndRemove({aid:id}).lean().exec(function(err, res){
            if (res) {
                resolve(res)
            }
            else {
                resolve(null)
            }
        })
    })
}

var getArchive = function () {
    return new Promise(resovle => {
        archive.aggregate([
            { $sort: { createdYear: 1 } },
            {
                $group: {
                    _id: '$createdYear',
                    articleList: { $push: "$$ROOT" }
                }
            }
        ])
            .exec((err, res) => {
                if (res) {
                    resovle(res)
                }
                else {
                    resolve(null)
                }
            })
    })
}

var delArticlesById = function (id) {
    return new Promise(resolve => {
        articles.findByIdAndRemove(id).lean().exec((err, res) => {
            if (res) {
                resolve(res)
            }
            else {
                resolve(null)
            }
        })
    })
}

var addArticles = function (title, content, types, sourceContent, createTime) {
    let schema = {
        title: title,
        date: createTime,
        content: content,
        types: types,
        sourceContent: sourceContent
    }
    let add = new articles(schema)
    return new Promise(resolve => {
        add.save(function (err, res) {
            if (res) {
                resolve((res))
            } else {
                resolve(null)
            }
        })
    })
}

var editArticlesById = function (id, title, content, types, sourceContent) {
    return new Promise(resolve => {
        articles.findByIdAndUpdate(
            { _id: id },
            { $set: { title: title, content: content, types: types, sourceContent } },
            { new: true },
            function (err, res) {
                if (err) {
                    resolve(null)
                } else if (res) {
                    resolve(res)
                }
            }
        )
    })
}

var editArchiveById = (id, title) => {
    return new Promise(resolve => {
        archive.findOneAndUpdate(
            { aid: id},
            {$set:{title: title}},
            (err, res) => {
                if(res) {
                    resolve(res)
                } else {
                    resolve(false)
                }
            }
        )
    })
}

module.exports = {
    getArticles,
    count,
    searchByKey,
    getArticlesById,
    delArticlesById,
    addArticles,
    editArticlesById,
    addArchive,
    delArchiveById,
    editArchiveById,
    getArchive
}