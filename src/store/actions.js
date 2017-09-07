import Axios from 'axios'
import * as types from './mutation-type.js'

export default {
  login ({ commit }, userInfo) {
    return Axios.post('/auth/log', userInfo).then((res) => {
      if (res.data.sta) {
        commit(types.LOGIN, res.data)
      }
    }, (err) => {
      if (err) {
        console.log('This is login error at actions:', err)
      }
    })
  },
  signOut ({ commit }) {
    commit(types.SIGNOUT)
  },
  getArticle ({ commit }, options) {
    var limit = options.limit
    var skip = options.skip
    Axios.get('/blog_api/getArticles/' + limit + '/' + skip).then((res) => {
      if (res.data.sta) {
        var ArticleList = res.data
        commit(types.GETARTICLE, ArticleList)
      }
    }, (err) => {
      if (err) {
        console.log('This is login error at actions:', err)
      }
    })
  },
  getUserInfo ({ commit }) {
    Axios.get('/blog_api/getUserInfo').then((res) => {
      if (res.data.sta) {
        var UserInfo = res.data.info
        commit(types.GETUSERINFO, UserInfo)
      }
    }, (err) => {
      if (err) {
        console.log('This is login error at actions:', err)
      }
    })
  },
  editUserInfo ({ commit }, data) {
    return new Promise(resolve => {
      Axios.post('/blog_api/editUserInfo', data).then((res) => {
        if (res.data.sta) {
          commit(types.EDITUSERINFO, res.data.info)
          resolve(res.data.sta)
        } else {
          resolve(false)
        }
      }, (err) => {
        if (err) {
          resolve(false)
        }
      })
    })
  },
  changePagerStatus ({ commit }, status) {
    commit(types.CHANGEPAGERSTATUS, status)
  },
  getArticleDetails ({ commit }, id) {
    Axios.get('/blog_api/getArticleDetails/' + id).then((res) => {
      if (res.data.sta) {
        var Details = res.data.info
        commit(types.GETARTICLEDETAILS, Details)
      }
    })
  },
  search ({ commit }, key) {
    key = key.replace(/\s+/g, '')
    if (key.length !== 0) {
      Axios.get('/blog_api/getArticles/search/' + key + '/' + 3 + '/' + 0).then((res) => {
        if (res.data.sta) {
          var ArticleList = res.data
          commit(types.SEARCH, ArticleList)
        }
      })
    } else {
      Axios.get('/blog_api/getArticles/' + 3 + '/' + 0).then((res) => {
        if (res.data.sta) {
          var ArticleList = res.data
          commit(types.GETARTICLE, ArticleList)
        }
      }, (err) => {
        if (err) {
          console.log('This is login error at actions:', err)
        }
      })
    }
  },
  getArchive ({ commit }) {
    Axios.get('/blog_api/getArchive').then((res) => {
      if (res.data.sta) {
        var archiveList = res.data
        commit(types.ARCHIVELIST, archiveList)
      }
    })
  },
  getNavList ({ commit }) {
    Axios.get('/blog_api/nav/get').then((res) => {
      if (res.data.sta) {
        let navList = res.data
        commit(types.GETNAVLIST, navList)
      }
    })
  },
  addNav ({ commit }, data) {
    return new Promise(resolve => {
      Axios.post('/blog_api/nav/add', data).then((res) => {
        if (res.data.sta) {
          resolve(res.data.sta)
        } else {
          resolve(false)
        }
      }, (err) => {
        if (err) {
          resolve(false)
        }
      })
    })
  },
  removeNav ({commit, state}, index) {
    let id = [...state.navList][index]._id
    return new Promise(resolve => {
      Axios.get('/blog_api/nav/remove/' + id).then((res) => {
        if (res.data.sta) {
          resolve(res.data.sta)
        } else {
          resolve(false)
        }
      }, (err) => {
        if (err) {
          resolve(false)
        }
      })
    })
  },
  verifyToken ({ commit }, token) {
    var obj = {
      access_token: token
    }
    Axios.post('/verify/verify', obj).then((res) => {
      if (res.data.sta) {
        var encodeToken = res.data.info
        commit(types.ENCODETOKEN, encodeToken)
      }
    })
  },
  addArticle ({ commit }, data) {
    return new Promise(resolve => {
      Axios.post('/blog_api/addArticle', data).then((res) => {
        if (res.data.sta === true) {
          resolve(res.data.sta)
        } else {
          resolve(false)
        }
      }, (err) => {
        if (err) {
          resolve(false)
        }
      })
    })
  },
  editArticle ({ commit }, index) {
    commit(types.EDITARTICLE, index)
  },
  updateArticle ({ commit }, data) {
    return new Promise(resolve => {
      Axios.post('/blog_api/updateArticle', data).then((res) => {
        if (res.data.sta === true) {
          commit(types.UPDATEARTICLE)
          resolve(res.data.sta)
        } else {
          resolve(false)
        }
      }, (err) => {
        if (err) {
          resolve(false)
        }
      })
    })
  },
  removeArticle ({commit, state}, index) {
    let id = [...state.articles][index]._id
    return new Promise(resolve => {
      Axios.get('/blog_api/removeArticle/' + id).then((res) => {
        if (res.data.sta === true) {
          resolve(true)
        } else {
          resolve(false)
        }
      }, (err) => {
        if (err) {
          resolve(false)
        }
      })
    })
  },
  changePSW ({ commit }, data) {
    return new Promise(resolve => {
      Axios.post('/blog_api/changePSW', data).then((res) => {
        if (res.data.sta) {
          resolve(res.data.sta)
        } else {
          resolve(false)
        }
      }, (err) => {
        if (err) {
          resolve(false)
        }
      })
    })
  },
  getSocialList ({ commit }) {
    Axios.get('/blog_api/social/get').then((res) => {
      if (res.data.sta) {
        commit(types.GETSOCIALLIST, res.data.info)
      }
    })
  },
  removeSocial ({commit, state}, index) {
    let id = state.socialList[index]._id
    return new Promise(resolve => {
      Axios.get('/blog_api/social/remove/' + id).then((res) => {
        if (res.data.sta) {
          resolve(res.data.sta)
        } else {
          resolve(false)
        }
      }, (err) => {
        if (err) {
          resolve(false)
        }
      })
    })
  },
  addSocial ({ commit }, data) {
    return new Promise(resolve => {
      Axios.post('/blog_api/social/add', data).then((res) => {
        if (res.data.sta) {
          resolve(res.data.sta)
        } else {
          resolve(false)
        }
      }, (err) => {
        if (err) {
          resolve(false)
        }
      })
    })
  },
  getSong ({ commit }, key) {
    Axios.get('/blog_api/song/search/' + key).then((res) => {
      if (res.data.sta) {
        commit(types.GETSONG, res.data.info)
      }
    }, (err) => {
      if (err) {
        console.log(err)
      }
    })
  },
  getUserSession ({ commit }) {
    let userSession = JSON.parse(window.sessionStorage.getItem('userSession'))
    commit(types.GETUSERSESSION, userSession)
  },
  commentSub ({ commit }, data) {
    return new Promise(resolve => {
      Axios.post('/blog_api/comments', data).then(res => {
        if (res.data.sta === true) {
          resolve(res.data.sta)
        }
      })
    })
  }
}
