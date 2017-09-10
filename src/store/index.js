import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations.js'
import actions from './actions.js'
import moment from 'moment'

Vue.use(Vuex)

const state = {
  articles: [],
  currPage: 1,
  currUpdateArticle: {},
  pagerIsShow: true,
  isEditArticle: false,
  articlesTotal: 0,
  articleDetails: {},
  userInfo: '',
  navList: [],
  socialList: [],
  temporaryArticle: null,
  articleList: [],
  archive: [],
  loginState: false,
  token: '',
  editArticle: '',
  songList: [],
  usersession: '',
  comments: '',
  unviewCommentsCount: 0,
  oAuthList: ''
}

const getters = {
  getArticleList: state => {
    state.articles.map(article => {
      article.date = moment(new Date(article.date)).locale('zh-cn').calendar()
    })
    return state.articles
  },
  getComments: state => {
    for (var comment of state.comments) {
      comment.time = moment(new Date(comment.time)).locale('zh-cn').calendar()
      if (Object.is(comment.to_id, null)) {
        comment.to_id = {
          '_id': 0,
          'nickname': ''
        }
      }
    }
    return state.comments
  },
  getArchiveList: state => {
    for (var items of state.archive) {
      for (var item of items.articleList) {
        item.time = moment(new Date(item.time)).locale('zh-cn').calendar()
      }
    }
    return state.archive
  },
  getOAuthList: state => {
    for (var item of state.oAuthList) {
      item.addtime = moment(new Date(item.addtime)).locale('zh-cn').calendar()
    }
    return state.oAuthList
  }
}

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})
