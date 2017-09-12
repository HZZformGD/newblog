<template lang="html">
  <vue-scrollbar classes="s_bar" ref="s_bar">
    <div ref="total_height">
      <headerComponent></headerComponent>
      <minHeader v-once></minHeader>
      <div class="chat">
        <chat :tourist="tourist" :nowId="nowId"></chat>
      </div>
      <transition
        name="custom-classes-transition"
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeInOut">
        <router-view></router-view>
      </transition>
      <UserInfo :userInfo="userInfo" :socialList="socialList"></UserInfo>
      <FooterComponent></FooterComponent>
    </div>
  </vue-scrollbar>
</template>

<script>
import headerComponent from '../common/Header'
import minHeader from '../common/carvas'
import UserInfo from '../common/UserInfo'
import FooterComponent from '../common/footer'
import chat from '../common/chat'
import VueScrollbar from 'vue2-scrollbar';
import scrollbar from 'vue2-scrollbar/dist/style/vue2-scrollbar.css'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      tourist: 'http://wx4.sinaimg.cn/mw690/beb8586fgy1fgm02f5jxzg208w08wqv6.gif',
      nowId: JSON.parse(window.sessionStorage.getItem('userSession'))
    }
  },
  computed: mapState({
    userInfo: 'userInfo',
    socialList: 'socialList',
    articlesTotal: 'articlesTotal'
  }),
  created () {
    this.getUserInfo()
    this.getSocialList()
    this.getNavList()
  },
  methods: {
    getUserInfo () {
      this.$store.dispatch('getUserInfo')
    },
    getSocialList () {
      this.$store.dispatch('getSocialList')
    },
    getArticleList (skip) {
      this.$store.dispatch('getArticle', {limit: 3, skip: skip})
    },
    getNavList () {
      this.$store.dispatch('getNavList')
    }
  },
  components: {
    headerComponent,
    minHeader,
    UserInfo,
    FooterComponent,
    chat,
    VueScrollbar
  }
}
</script>

<style scoped>
  .chat {
    width: 500px;
    position: fixed;
    right:0;
    top:100px;
    z-index:90;
  }
  .s_bar{
    height:100%;
  }
  #pager{
    padding-bottom: 10px;
  }
</style>
