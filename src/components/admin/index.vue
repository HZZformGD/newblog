<template lang="html">
  <div class="backstage-main">
    <div class="chat">
      <chat :nowId="userInfo" :tourist="userInfo.avatar" :isAdmin="userInfo.avatar"></chat>
    </div>
    <div class="left-module col-sm-2 hidden-xs">
      <div class="logo">
        欢迎进入博客后台
      </div>
      <ul class="nav_list">
        <li v-for="item in navList" key="item.id">
          <router-link :to="item.path">
            <i :class="item.icon" class="icon"></i>
            <span class="nav_title">{{ item.text }}</span>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="right-module col-sm-10">
      <div class="right-module_header">
        <div class="pull-left to_greet">
          <a href="/" active-class="fire-action">
            <i class="glyphicon glyphicon-home go-home" title="返回首页"></i>
          </a>
          <i class="glyphicon glyphicon-off mrgL30" @click="signOut"></i>
        </div>
        <div class="music">
          <musicPlayer :right="right"></musicPlayer>
        </div>
        <div class="pull-right">
          <figure>
            <figcaption>
              {{ getTime }}好，{{ userInfo.name }} ~
            </figcaption>
            <img :src="userInfo.avatar"/>
            <i v-if="!Object.is(count, 0)" :class="viewClass" @click="viewed">未读消息</i>
            <el-badge  :value="count" :max="10" class="item">
            </el-badge>
          </figure>
        </div>
      </div>
      <div class="right-module_main">
        <router-view></router-view>
      </div>
      <div class="bottom-nav hidden-sm hidden-md hidden-lg">
        <li v-for="item in navList" key="item.id">
          <router-link :to="item.path">
            <i :class="item.icon" class="icon"></i>
          </router-link>
        </li>
      </div>
    </div>
  </div>
</template>

<script>
import musicPlayer from '../common/musicPlayer'
import moment from 'moment'
import chat from '../common/chat'

export default {
  data () {
    return {
      navList: [
        {
          text: '发表博客',
          path: '/admin/post',
          icon: 'glyphicon glyphicon-pencil'
        },
        {
          text: '文章列表',
          path: '/admin/articleList',
          icon: 'glyphicon glyphicon-list'
        },
        {
          text: '设置',
          path: '/admin/settings',
          icon: 'glyphicon glyphicon-cog'
        },
        {
          text: 'oAuth用户',
          path: '/admin/oAuth',
          icon: 'fa fa-user-circle-o'
        },
        {
          text: 'oAuth评论',
          path: '/admin/comments',
          icon: 'fa fa-commenting-o'
        },
        {
          text: '回复评论',
          path: '/admin/reply',
          icon: 'fa fa-edit'
        }
      ],
      viewClass: 'fa fa-bell faa-ring animated View',
      right: true,
      nowId: '59321aa8a2f622dfa0121015'
    }
  },
  computed: {
    userInfo () {
      return this.$store.state.token.account
    },
    getTime () {
      return moment().locale('zh-cn').format('a')
    },
    count () {
      return this.$store.state.unviewCommentsCount
    }
  },
  created () {
    this.verifyToken()
    this.getUnviewCommentsCount()
  },
  methods: {
    verifyToken () {
      var token = sessionStorage.getItem('token')
      this.$store.dispatch('verifyToken', token)
    },
    signOut () {
      this.$confirm('是否注销', '提醒！', {
        confirmButtonText: '确定',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('signOut')
        this.$router.go('/')
      })
    },
    async viewed () {
      let res = await this.$store.dispatch('ViewedComments')
      if (Object.is(res, true)) {
        this.getUnviewCommentsCount()
      }
    },
    getUnviewCommentsCount () {
      this.$store.dispatch('getUnviewCommentsCount')
    }
  },
  components: {
    musicPlayer,
    chat
  }
}
</script>

<style lang="css">
.chat {
  position:fixed;
  top:100px;
  z-index:102;
  right:0px;
  width:500px;
}
.backstage-main {
    position: absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
  }
  .left-module {
    padding: 0;
    background:#1d2b35;
    min-height: 100%;
  }
  .left-module .logo {
    height: 80px;
    line-height: 80px;
    background-color: #27cacc;
    color:#fff;
    font-size: 20px;
    text-align: center;
    overflow: hidden;
  }
  .nav_list li a {
    padding:30px 0;
    display: block;
  }
  .nav_list li a:hover {
    background: #546573;
    color:#fff;
  }
  .router-link-active {
    background: #2d3f4d;
    color:#fff;
  }
  .nav_list .icon {
    display: block;
    text-align: center;
    font-size:40px;
    margin-bottom:10px;
  }
  .nav_list a:hover {
    text-decoration: none;
  }
  .nav_title {
    display: block;
    text-align: center;
    color:#b5a9a9;
  }
  .right-module {
    padding: 0;
    min-height: 100%;
  }
  .right-module_header {
    height: 80px;
    line-height: 80px;
    background:#eef3f7;
    width: 100%;
    overflow: hidden;
    box-shadow: 1px 2px 4px #ccc;
  }
  .right-module_header figure {
    margin-right: 60px;
  }
  .right-module_header figure img {
    width:50px;
    height: 50px;
    border-radius: 50%;
  }
  .right-module_header figcaption {
    display: inline;
    color:#000;
    font-size:16px;
    margin-right: 10px;
  }
  .to_greet {
    font-size:30px;
    color:#2d3f4d;
    margin-left: 30px;
  }
  .right-module_main {
    width: 100%;
    padding: 40px;
  }
  .go-home{
    transition:all 1s;
    background: none;
  }
  .go-home:hover {
    color:red;
  }
  .mrgL30 {
    margin-left: 30px;
  }
  .bottom-nav {
    background: #2d3f4d;
    padding: 10px 0;
    display: flex;
    text-align: center;
    position: absolute;
    bottom:0;
    width: 100%;
  }
  .bottom-nav li {
    flex:1;
    list-style: none;
  }
  .View:hover,.View:focus{
    cursor: pointer;
  }
  .music {
    position: absolute;
    top: 13px;
    left: 170px;
  }
</style>
