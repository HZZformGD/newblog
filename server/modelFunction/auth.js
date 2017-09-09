const model = require('../models/userModel');
const oAuthModel = require('../models/oAuthModel');
const Axios = require('axios');
const querystring = require("querystring");
const moment =require('moment');

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

var oAuth = (code, type) => {
    return new Promise(resolve => {
        switch (type) {
            case 'weibo':
                let weibo_url = 'https://api.weibo.com/oauth2/access_token?client_id=3328252567&client_secret=8f20a75f5a2a86a1fa2ec19ed70f578c&grant_type=authorization_code&redirect_uri=http://www.huangzhenzhan.club/callback?type=weibo&code=' + code
                let weibo_opt = {
                    url:weibo_url,
                    responsetype:'json',
                    method:'post'
                }
                Axios(weibo_opt).then(res => {
                    let weibo_token = res.data.access_token
                    let weibo_id = res.data.uid
                    if (weibo_token && weibo_id) {
                        Axios({
                            url:'https://api.weibo.com/2/users/show.json?access_token=' + weibo_token + '&uid=' + weibo_id,
                            method:'get',
                            responsetype:'json'
                        }).then(res => {
                            console.log(res.data)
                            let time = moment().format();
                            let info = res.data
                            let query = {
                                nickname:info.screen_name,
                                avatar:info.profile_image_url,
                                oauthid:info.id,
                                addtime:time,
                                from:'微博'
                            }
                            oAuthModel.find({'oauthid':info.id})
                            .lean()
                            .exec( (err,res) => {
                                if (res != "") {
                                    resolve(res)
                                } else {
                                    oauth = new oAuthModel(query);
                                    oauth.save((err,res) => {
                                        if (res) {
                                            resolve(res)
                                        } else {
                                            resolve(false)
                                        }
                                    })
                                }
                            })
                        }).catch(err => {
                            console.log(err)
                        })
                    }
                }).catch(err => {
                    console.log(err)
                })
            case 'github':
                let git_url = 'https://github.com/login/oauth/access_token?client_id=37169fc792fb75ef71b3&client_secret=f92d22863520d88d40d81f2d78bc9f37c7dde6a9&code=' + code + '&redirect_uri=http://127.0.0.1:8090/callback?type=github'
                let git_opt = {
                    url:git_url,
                    responsetype:'json',
                    method:'get'
                }
                Axios(git_opt).then((res) => {
                    let string = querystring.parse(res.data);
                    let gitToken =string.access_token;
                    if (gitToken) {
                        let git_uri = 'https://api.github.com/user?access_token='+gitToken;
                        let option = {
                            url:git_uri,
                            headers:{'User-Agent': 'HzzBlog'},
                            method:'get'
                        }
                        Axios(option).then((result) => {
                            let time = moment().format()
                            let info = result.data
                            let query = {
                                nickname:info.login,
                                avatar:info.avatar_url,
                                oauthid:info.id,
                                addtime:time,
                                from:'github'
                            }
                            oAuthModel.find({'oauthid':info.id})
                            .lean()
                            .exec((err,res) => {
                                if (res != "") {
                                    resolve(res)
                                } else {
                                    oauth = new oAuthModel(query);
                                    oauth.save((err,res) => {
                                        if (res) {
                                            resolve(res)
                                        } else {
                                            resolve(false)
                                        }
                                    })
                                }
                            })
                        }).catch((error) => {
                            console.log(error)
                        });
                    }
                }).catch((err) => {
                    console.log(err)
                });
            }
    })
}

var oAuthList = () => {
    return new Promise(resolve => {
        oAuthModel.find()
        .lean()
        .exec((err,res) => {
            if (res != "") {
                resolve(res)
            } else {
                resolve(err)
            }
        })
    })
}

module.exports.log = log
module.exports.signup = signup
module.exports.editAuth = editAuth
module.exports.oAuth = oAuth
module.exports.oAuthList = oAuthList