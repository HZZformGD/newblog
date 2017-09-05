const list = require('../models/listModel');

var addList = function (Schema) {

    listSchema = new list(Schema)
    return new Promise(resolve => {
        listSchema.save(function (err, res) {
            if (res) {
                var result = JSON.stringify(res)
                resolve(result)
            }
        })
    })

}

var getLists = function (id) {
    return new Promise(resolve => {
        list.find({ user_id: id }).lean().select({ "content": 1, "status": 1, "_id": 1 }).exec(function (err, res) {
            if (res) {
                var result = JSON.stringify(res)
                resolve(result)
            }
        })
    })

}

var editList = function (list_id, status) {
    return new Promise(resolve => {
        list.findByIdAndUpdate(
            { _id: list_id },
            { $set: { status: status } },
            { new: true },
            function (err, res) {
                if(err) {
                    resolve(null)
                }else if (res) {
                    resolve(res)
                }
            }
        )
    })
}

var delList = function (list_id) {
    return new Promise (resolve => {
        list.findByIdAndRemove(list_id,function (err,res) {
            if (err) {
                resolve(null)
            } else if (res) {
                resolve(res)
            }
        })
    })
}

module.exports = {
    addList,
    getLists,
    editList,
    delList
}