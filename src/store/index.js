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
  songList: []
}

const getters = {
  getArticleList: state => {
    state.articles.map(article => {
      article.date = moment(new Date(article.date)).locale('zh-cn').calendar()
    })
    return state.articles
  },
  getArchiveList: state => {
    state.archive = convert(state.archive)
    state.archive.map((item, index) => {
      item[0].articleList.map(list => {
        list.time = list.time.substr(0, 10)
      })
    })
    console.log(state.archive)
    return state.archive
  }
}

function convert (original) {
  var multiArray = []
  for (var key in original) {
    multiArray.push([ original[key] ])
  }
  return multiArray
}

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})
