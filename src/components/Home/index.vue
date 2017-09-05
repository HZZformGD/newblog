<template lang="html">
  <div>
    <headerComponent></headerComponent>
    <minHeader v-once></minHeader>
    <transition
      name="custom-classes-transition"
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeInOut">
      <router-view></router-view>
    </transition>
    <div class="col-xs-8 col-xs-offset-2">
      <Pager :limit='limit'></Pager>
    </div>
    <UserInfo :userInfo="userInfo" :socialList="socialList"></UserInfo>
    <FooterComponent></FooterComponent>
  </div>
</template>

<script>
import headerComponent from '../common/Header'
import minHeader from '../common/carvas'
import UserInfo from '../common/UserInfo'
import FooterComponent from '../common/footer'
import Pager from '../common/pager'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      skip: 0,
      limit: 3
    }
  },
  computed: mapState({
    userInfo: 'userInfo',
    socialList: 'socialList'
  }),
  created () {
    this.getUserInfo()
    this.getSocialList()
    this.getNavList()
    this.getArticle()
  },
  methods: {
    getUserInfo () {
      this.$store.dispatch('getUserInfo')
    },
    getSocialList () {
      this.$store.dispatch('getSocialList')
    },
    getArticle () {
      this.$store.dispatch('getArticle', { limit: this.limit, skip: this.skip })
    },
    getArticleList (skip) {
      this.$store.dispatch('getArticle', {limit: this.limit, skip: skip})
    },
    getNavList () {
      this.$store.dispatch('getNavList')
    }
  },
  components: {
    headerComponent,
    minHeader,
    UserInfo,
    Pager,
    FooterComponent
  }
}
</script>
