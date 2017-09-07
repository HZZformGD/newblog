const auth = require('../modelFunction/auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var log = async (ctx, next) => {
    var Account = ctx.request.body.account,
        Password = ctx.request.body.password,
        query = {
            account: Account,
        }
    console.log(Account,Password)
    var data = await auth.log(query);

    if (data.length > 0) {
        if (bcrypt.compareSync(Password, data[0].password)) {
            const userToken = {
                account: data[0].account,
                id: data[0]._id
            }
            const secret = 'vue-koa-demo';
            const token = jwt.sign(userToken, secret);
            ctx.response.type = 'application/json'
            ctx.response.body = {
                sta: true,
                token: token
            }
        }
        else if (!bcrypt.compareSync(Password, data[0].password)) {
            ctx.response.type = 'application/json'
            ctx.response.body = {
                sta: false,
                info: '密码错了'
            }


        }

    } if (data.length == 0) {
        ctx.response.type = 'application/json'
        ctx.response.body = {
            sta: false,
            info: '账号不存在'
        }
    }

}

var changePSW = async (ctx, next) => {
    let oldPassword = ctx.request.body.oldPassword
    let newPassword = ctx.request.body.newPassword
    let id = ctx.request.body.id;
    let query = {
        _id : id
    }
    newPassword = bcrypt.hashSync(newPassword)
    console.log('newPassword',newPassword)
    let data =  await auth.log(query);
    if (data) {
        if (bcrypt.compareSync(oldPassword, data[0].password)) {
            let res = await auth.editAuth(id, newPassword)
            if (res) {
                ctx.response.type = 'application/json'
                ctx.response.body = {
                    sta: true,
                    info: '修改成功'
                }
            } else {
                ctx.response.type = 'application/json'
                ctx.response.body = {
                    sta: false,
                    info: '修改失败'
                }
            }
        } else {
            ctx.response.type = 'application/json'
            ctx.response.body = {
                sta: false,
                info: '密码错了'
            }
        }
    } else {
        ctx.response.type = 'application/json'
        ctx.response.body = {
            sta: false,
            info: '非法操作'
        }
    }
}

var signup = async (ctx, next) => {
    let Account = ctx.request.body.account,
        Password = ctx.request.body.password,
        query = {
            account: Account,
            password: Password
        }
    let data = await auth.signup(query);

    ctx.response.type = 'application/json';
    ctx.response.body = JSON.stringify(data);
}

var oAuth = async(ctx, next) => {
    let code = ctx.params.code
    let oinfo = await auth.oAuth(code)
    if (oinfo) {
        ctx.response.type = 'application/json'
        ctx.response.body = {
            sta: true,
            info: oinfo
        }
    }

}

module.exports = {
    log,
    signup,
    changePSW,
    oAuth
}
