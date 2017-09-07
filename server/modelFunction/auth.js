const model = require('../models/userModel');
const oAuthModel = require('../models/oAuthModel');
const Axios = require('axios');
const querystring = require("querystring");

var log = function (query) {
    return new Promise(resolve =>{
        model.find(query).lean().populate('account').exec(function (err,res){
            if (err) {
                console.log(err)
            }
            if (res) {
                resolve(res);
            }
        })
    })
}

var signup = function (query){
    mymodel = new model(query);
    return new Promise(resolve =>{
        mymodel.save(function(err,res){
            if(res){
                var result = JSON.stringify(res);
                resolve(result);
            }
        })
    })
}

var editAuth = (id, newPassword) => {
    return new Promise(resolve => {
        model.findByIdAndUpdate(
            {_id:id},
            {$set:{password:newPassword}},
            function (err, res) {
                if (res) {
                    resolve(true)
                }
                else {
                    resolve(false)
                }
            }
        )
    })
}

var oAuth = (code) => {
    var acc_url = 'https://github.com/login/oauth/access_token?client_id=37169fc792fb75ef71b3&client_secret=f92d22863520d88d40d81f2d78bc9f37c7dde6a9&code=' + code + '&redirect_uri=http://127.0.0.1:8090/home/article/callback'
    var opt = {
        url:acc_url,
        responsetype:'json',
        method:'get'
    }
    return new Promise(resolve => {
        Axios(opt).then((res) => {
            let string = querystring.parse(res.data);
            let token =string.access_token;
            if (token) {
                var uri = 'https://api.github.com/user?access_token='+token;
                var option = {
                    url:uri,
                    headers:{'User-Agent': 'HzzBlog'},
                    method:'get'
                }
                Axios(option).then((result) => {
                    let date = new Date()
                    let time = date.toLocaleString()
                    let info = result.data
                    let query = {
                        nickname:info.login,
                        avatar:info.avatar_url,
                        oauthid:info.id,
                        addtime:time
                    }
                    oauth = new oAuthModel(query);
                    oauth.save((err,res) => {
                        if (res) {
                            resolve(res)
                        }
                    })
                }).catch((error) => {
                    console.log(error)
                });
            }
        }).catch((err) => {
            console.log(err)
        });
    })
}

module.exports.log = log;
module.exports.signup = signup;
module.exports.editAuth = editAuth;
module.exports.oAuth = oAuth;