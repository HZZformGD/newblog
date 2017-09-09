<template lang="html">
  <div class="col-xs-8 col-xs-offset-2">
    <div class="articles">
      <span class='title'>{{ articleDetails.title }}</span>
      <article class="aritcle_content" v-html="articleDetails.content"></article>
    </div>
    <div class="comments_area">
      <mu-list>
        <mu-sub-header class="comment_area">评论区</mu-sub-header>
        <mu-list-item v-for="(item, index) in commentsList"  :key="item.commerId._id"  :title="item.commerId.nickname">
          <mu-avatar :src="item.commerId.avatar" slot="leftAvatar"/>
          <span slot="describe">
            <span v-if="item.to_id" style="color: rgba(0, 0, 0, .87)">to {{ item.to_id.nickname }} -</span> {{ item.replay_comment }} 
            <span class="commentTime">{{ item.time }}</span>
          </span>
          <mu-icon slot="right" v-if="!(item.commerId._id === getUserInfoSession._id || getUserInfoSession._id ===0)" value=":fa fa-reply" tooltip="回复" @click="showReply(item._id)"/>
          <mu-text-field :id="'field_'+item._id" class="noShow" hintText="回复些什么好呢" v-model="reply_words" fullWidth  multiLine :rows="3" :rowsMax="6"/>
          <mu-flat-button :id="'reply_'+item._id" class="noShow" label="回复" icon=":fa fa-android" @click="reply(item._id, item.commerId._id)" primary/>
        </mu-list-item>
      </mu-list> 
    </div>
    <div class="input_area">
      <mu-text-field v-model="input_words" :disabled="(getUserInfoSession._id === 0)" label="留下你的脚印~~" fullWidth icon=":fa fa-commenting-o"  multiLine :rows="6" labelFloat/>
      <mu-icon-button v-if="(getUserInfoSession._id === 0)" tooltip="github登录" slot="right"  href="https://github.com/login/oauth/authorize?client_id=37169fc792fb75ef71b3&state=1994&redirect_uri=http://127.0.0.1:8090/callback?type=github"  class="git-sign-in"  >
        <i class="fa fa-github-alt"></i>
      </mu-icon-button>
      <mu-icon-button v-if="(getUserInfoSession._id === 0)" tooltip="微博登录" slot="right"  href="https://api.weibo.com/oauth2/authorize?client_id=3328252567&response_type=code&redirect_uri=http://www.huangzhenzhan.club/home/article/callback?type=weibo"  class="wei-sign-in"  >
        <i class="fa fa-weibo"></i>
      </mu-icon-button>
      <mu-raised-button v-if="(getUserInfoSession._id !== 0)" class="comments" @click="comments"  label="发表" icon=":fa fa-comments" primary/>
      <div class="info" v-if="(getUserInfoSession._id !== 0)">
        <mu-list-item :title="getUserInfoSession.nickname" disabled>
          <mu-avatar slot="left" :src="getUserInfoSession.avatar"/>
        </mu-list-item>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['articleDetails'],
  data () {
    return {
      reply_words: '',
      input_words: ''
    }
  },
  created () {
    this.getUserSession()
    this.getComments()
  },
  computed: {
    getUserInfoSession () {
      if (this.$store.state.usersession) {
        return this.$store.state.usersession
      } else {
        let data = {
          '_id': 0
        }
        return data
      }
    },
    commentsList () {
      return this.$store.getters.getComments
    }
  },
  methods: {
    getComments () {
      let articleId = this.$route.params.id
      let data = {
        'articleId': articleId
      }
      if (articleId) {
        this.$store.dispatch('getComments', data)
      }
    },
    getUserSession () {
      this.$store.dispatch('getUserSession')
    },
    showReply (id) {
      var field = document.getElementById('field_' + id)
      var reply = document.getElementById('reply_' + id)
      if (field.style.display === '' || field.style.display === 'none') {
        field.style.display = 'block'
      } else {
        field.style.display = 'none'
      }
      if (reply.style.display === '' || reply.style.display === 'none') {
        reply.style.display = 'block'
      } else {
        reply.style.display = 'none'
      }
    },
    async comments () {
      let comment = this.input_words
      let articleId = this.$route.params.id
      let commerId = this.getUserInfoSession._id
      let toId = 'ffffffffffffffffffffffff'
      let data = {
        'replay_comment': comment,
        'articleId': articleId,
        'commerId': commerId,
        'to_id': toId
      }
      let sta = await this.$store.dispatch('commentSub', data)
      if (sta === true) {
        this.getComments()
        this.input_words = ''
      }
    },
    signIn () {
      this.canCom = false
    },
    async reply (id, cid) {
      var field = document.getElementById('field_' + id)
      var reply = document.getElementById('reply_' + id)
      console.log()
      if (field.style.display === '' || field.style.display === 'none') {
        field.style.display = 'block'
      } else {
        field.style.display = 'none'
      }
      if (reply.style.display === '' || reply.style.display === 'none') {
        reply.style.display = 'block'
      } else {
        reply.style.display = 'none'
      }
      let comment = field.getElementsByTagName('textarea')[0].value
      let articleId = this.$route.params.id
      let commerId = this.getUserInfoSession._id
      let toId = cid
      let data = {
        'replay_comment': comment,
        'articleId': articleId,
        'commerId': commerId,
        'to_id': toId
      }
      let sta = await this.$store.dispatch('commentSub', data)
      if (sta === true) {
        reply.style.display = 'none'
        field.style.display = 'none'
        this.getComments()
        comment = ''
      }
    }
  }
}
</script>

<style lang="css" scoped>
  .title {
    font-size:30px;
    font-weight: bold;
    color:#666;
    padding:20px 0;
    font-weight: bold;
    letter-spacing: 3px;
  }
  .aritcle_content {
    font-size:16px;
    color:#666;
    margin:30px 0;
    letter-spacing: 2px;
    line-height: 1.5;
  }
  .aritcle_content p {
    text-indent: 2rem;
  }
  .comment_area{
    font-size:20px;
  }
  .noShow {
    display: none;
  }
  .comments {
    z-index:10;
    float:right;
  }
  .input_area {
    margin-bottom:50px;
  }
  .commentTime {
    float: right;
  }
  .wei-sign-in {
    float:right;
    z-index:10;
    color:#bbb;
  }
  .git-sign-in {
    float:right;
    z-index:10;
    color:#bbb;
  }
  .git-sign-in:hover ,.git-sign-in:hover {
    color:#4a95ce;
  }
  .wei-sign-in:hover ,.wei-sign-in:hover {
    color:#e6162d;
  }
</style>
