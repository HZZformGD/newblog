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
  comments: ''
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
      comment.time = moment().locale('zh-cn').calendar(comment.time)
    }
    return state.comments
  },
  getArchiveList: state => {
    for (var items of state.archive) {
      for (var item of items.articleList) {
        item.time = moment().locale('zh-cn').calendar(item.time)
      }
    }
    return state.archive
  }
}

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})
