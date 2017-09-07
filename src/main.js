import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import 'element-ui/lib/theme-default/index.css'
import './assets/styles/index.css'
import './assets/styles/markdown.css'
import './assets/styles/font-awesome-4.7.0/css/font-awesome.min.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'animate.css'
import VueRouter from 'vue-router'
import store from './store/index'
import Axios from 'axios'

Vue.use(MuseUI)
Vue.use(ElementUI)
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/login',
      component: resolve => require(['./components/Login/index'], resolve)
    },
    {
      path: '/admin/',
      meta: { 'requiresAuth': true },
      redirect: '/admin/articleList',
      component: resolve => require(['./components/admin/index'], resolve),
      children: [
        {
          path: 'post',
          component: resolve => require(['./components/admin/postArticles'], resolve)
        },
        {
          path: 'articleList',
          component: resolve => require(['./components/admin/articleList'], resolve)
        },
        {
          path: 'settings/',
          component: resolve => require(['./components/admin/settings/index'], resolve),
          redirect: 'settings/password',
          children: [
            {
              path: 'password',
              component: resolve => require(['./components/admin/settings/password'], resolve)
            },
            {
              path: 'navList',
              component: resolve => require(['./components/admin/settings/navList'], resolve)
            },
            {
              path: 'social',
              component: resolve => require(['./components/admin/settings/social'], resolve)
            },
            {
              path: 'userInfo',
              component: resolve => require(['./components/admin/settings/userInfo'], resolve)
            }
          ]
        }
      ]
    },
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home/',
      name: 'home',
      redirect: '/home/article',
      component: resolve => require(['./components/Home/index'], resolve),
      children: [
        {
          path: 'article',
          name: 'articleList',
          component: resolve => require(['./components/Home/homeBody'], resolve)
        },
        {
          path: 'article/:id',
          name: 'articleDetails',
          component: resolve => require(['./components/Details/index'], resolve)
        },
        {
          path: 'archive',
          name: 'archiveList',
          component: resolve => require(['./components/Archive/index'], resolve)
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem('token')
  let auth = to.matched[0].meta.requiresAuth
  let code = to.query.code
  if (code !== undefined) {
    console.log(Axios.defaults.headers)
    Axios.get('https://github.com/login/oauth/access_token?client_id=37169fc792fb75ef71b3&client_secret=f92d22863520d88d40d81f2d78bc9f37c7dde6a9&code=' + code + '&redirect_uri=http://127.0.0.1:8090/home/article/callback')
    .then((res) => {
      console.log(res)
    })
  } else {
    next()
  }
  if (auth) {
    if (!token) {
      next({
        path: '/login'
      })
    } else {
      Axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
      next()
    }
  } else {
    next()
  }
  // if (to.path === '/') {
  //   if (token !== 'null' && token != null) {
  //     next('/todolist')
  //   }
  //   next()
  // } else {
  //   if (token !== 'null' && token != null) {
  //     Vue.prototype.$http.defaults.headers.common['Authorization'] = 'Bearer ' + token
  //     next()
  //   } else {
  //     next('/')
  //   }
  // }
})

new Vue({
  router: router,
  render: h => h(App),
  store
}).$mount('#app')
