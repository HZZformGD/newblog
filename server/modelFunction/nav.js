const nav = require('../models/navModel');

var getnav = () => {
    return new Promise (resolve => {
        nav.find()
        .lean()
        .exec(function (err, res) {
            if (res) {
                resolve(res)
            } else {
                resolve(null)
            }
        })
    })
}

var addNav = (path, text) => {
    let Schema = {
        path: path,
        text: text
    }
    let data = new nav(Schema)
    return new Promise(resolve => {
        data.save(function(err, res) {
            if (res) {
                resolve(res)
            } else {
                resolve(null)
            }
        })
    })
}

var removeNav = (id) => {
    return new Promise(resolve => {
        nav.findByIdAndRemove(id).lean().exec(function(err, res) {
            if (res) {
                resolve(res)
            } else {
                resolve(false)
            }
        })
    })
}

module.exports = {
    getnav,
    addNav,
    removeNav
}