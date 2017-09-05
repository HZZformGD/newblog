const model = require('../models/userModel');

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

module.exports.log = log;
module.exports.signup = signup;
module.exports.editAuth = editAuth;
