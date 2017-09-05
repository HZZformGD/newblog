const model = require('../models/userInfoModel');

var getUserInfo = function () {
    return new Promise (resolve => {
        model.findOne({}).lean().exec(function (err,res){
            if (res) {
                resolve(res)
            }
            else {
                resolve(false)
            }
        })

    })
}

var editUserInfo = function (_id,avatar,blogTitle,motto) {
    return new Promise (resolve => {
        model.findOneAndUpdate({_id:_id},{$set:{avatar:avatar,blogTitle:blogTitle,motto:motto}},{new:true})
        .lean()
        .exec(function (err,res){
            if(res) {
                resolve(res)
            }
            else {
                resolve(false)
            }
        })
    })
}

module.exports = {
    getUserInfo,
    editUserInfo
}