import * as types from './mutation-type'

export default {
  [types.LOGIN] (state, result) {
    if (result.sta === true) {
      window.sessionStorage.setItem('token', result.token)
    }
    state.loginState = result.sta
  },
  [types.SIGNOUT] (state) {
    window.sessionStorage.removeItem('token')
  },
  [types.GETARTICLE] (state, data) {
    state.articles = data.info
    state.articlesTotal = data.total
  },
  [types.GETARTICLEDETAILS] (state, data) {
    state.articleDetails = data
  },
  [types.GETUSERINFO] (state, userInfo) {
    state.userInfo = userInfo
  },
  [types.EDITUSERINFO] (state, userInfo) {
    state.token.account = userInfo
  },
  [types.SAVESOCAILCONTACT] (state, data) {
    state.socailContact.push(data)
  },
  [types.UPDATESOCAILCONTACT] (state, updateData) {
    let index = updateData.index
    let newData = updateData.data
    state.socailContact.splice(index, 1, newData)
  },
  [types.REMOVESOCAILCONTACT] (state, index) {
    state.socailContact.splice(index, 1)
  },
  [types.GETSOCIALLIST] (state, data) {
    state.socialList = data
  },
  [types.GETNAVLIST] (state, data) {
    state.navList = data.info
  },
  [types.REMOVEARTICLE] (state, index) {
    state.articles.splice(index, 1)
  },
  [types.CREATEDARTICLE] (state, data) {
    console.log('创建成功', data)
  },
  [types.SETCURRPAGE] (state, currPage) {
    state.currPage = currPage
  },
  [types.UPDATEPWD] (state, token) {
    state.token = token
  },
  [types.UPDATEUSERINFO] (state, userInfo) {
    state.userInfo = userInfo
  },
  [types.ADDNAV] (state, navList) {
    state.navList.push(navList)
  },
  [types.REMOVENAV] (state, index) {
    state.navList.splice(index, 1)
  },
  [types.EDITARTICLE] (state, index) {
    state.editArticle = state.articles[index]
    state.isEditArticle = true
  },
  [types.UPDATEARTICLE] (state, data) {
    state.isEditArticle = false
    state.editArticle = {}
  },
  [types.SHOW_MODAL] (state, data) {
    state.modal.show = true
    state.modal.type = data.type
    state.modal.message = data.message
    state.modal.ok = data.ok
    state.modal.cancel = data.cancel
  },
  [types.CLOSE_MODAL] (state) {
    state.modal.show = false
  },
  [types.SEARCH] (state, data) {
    state.articles = data.info
  },
  [types.ARCHIVELIST] (state, data) {
    state.archive = data.info
  },
  [types.CHANGEPAGERSTATUS] (state, status) {
    state.pagerIsShow = status
  },
  [types.ENCODETOKEN] (state, token) {
    state.token = token
  },
  [types.GETSONG] (state, songList) {
    state.songList = songList
  },
  [types.GETUSERSESSION] (state, usersession) {
    state.usersession = usersession
  }
}

