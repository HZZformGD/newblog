const social = require('../models/socialModel');

var getSocial = () => {
  return new Promise(resolve => {
    social.find().lean().exec(function(err, res) {
      if (res) {
        resolve(res)
      } else {
        resolve(false)
      }
    })
  })
}

var removeSocial = (id) => {
  return new Promise(resolve => {
    social.findByIdAndRemove(id).lean().exec(function(err, res) {
      if (res) {
        resolve(res)
      } else {
        resolve(false)
      }
    })
  })
}

var addSocial = (src, path) => {
  let Schema = {
    src: src,
    path: path
  }
  let data = new social(Schema)
  return new Promise(resolve => {
    data.save(function(err, res){
      if (res) {
        resolve(res)
      } else {
        resolve(false)
      }
    })
  })
}

module.exports = {
  getSocial,
  removeSocial,
  addSocial
}