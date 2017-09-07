<template lang="html">
  <div class="col-xs-8 col-xs-offset-2">
    <div class="articles">
      <span class='title'>{{ articleDetails.title }}</span>
      <article class="aritcle_content" v-html="articleDetails.content"></article>
    </div>
    <div class="comments">
      <mu-list>
        <mu-sub-header class="comment_area">评论区</mu-sub-header>
        <mu-list-item v-for="(item, index) in commentsList" :key="item.replyer_id"  :title="item.replyer_name">
          <mu-avatar src="/static/logo.png" slot="leftAvatar"/>
          <span slot="describe">
            <span style="color: rgba(0, 0, 0, .87)">to {{ item.to_name }} -</span> {{ item.reply_content }}
          </span>
          <mu-icon slot="right" value=":fa fa-reply" tooltip="回复" @click.stop="showReply(item.replyer_id)"/>
          <mu-text-field :id="'field_'+item.replyer_id" class="noShow" hintText="回复些什么好呢" v-model="reply_words" fullWidth  multiLine :rows="3" :rowsMax="6"/>
          <mu-flat-button :id="'reply_'+item.replyer_id" class="noShow" label="回复" icon=":fa fa-android" @click="reply(item.replyer_id)" primary/>
        </mu-list-item>
      </mu-list> 
    </div>
    <div class="input_area">
      <mu-text-field v-model="input_words" :disabled="canCom" label="留下你的脚印~~" fullWidth icon=":fa fa-commenting-o"  multiLine :rows="6" labelFloat/>
      <mu-raised-button v-if="canCom" slot="right"  href="https://github.com/login/oauth/authorize?client_id=37169fc792fb75ef71b3&state=1994&redirect_uri=http://127.0.0.1:8090/home/article/callback/"  class="sign-in" label="登录" icon=":fa fa-sign-in" primary/>
      <mu-raised-button v-if="!canCom" slot="right" @click="comments"  class="comments" label="发表" icon=":fa fa-comments" primary/>
    </div>
  </div>
</template>

<script>
export default {
  props: ['articleDetails'],
  data () {
    return {
      reply_words: '',
      input_words: '',
      canCom: true,
      commentsList: [
        {
          replyer_name: '黄镇展',
          replyer_avatar: '/static/logo.png',
          replyer_id: '1',
          reply_content: '周末要来你这里出差，要不要一起吃个饭呀，实在编不下去了,哈哈哈哈哈哈末要来你这里出差，要不要一起吃个饭呀，实在编不下去了,哈哈哈哈哈哈末要来你这里出差，要不要一起吃个饭呀，实在编不下去了,哈哈哈哈哈哈',
          to_name: 'Mike James',
          to_id: '2'
        },
        {
          replyer_name: 'Mike James',
          replyer_avatar: '/static/logo.png',
          replyer_id: '2',
          reply_content: '不了不了，我不想吃这个 哈哈',
          to_name: '黄镇展',
          to_id: '1'
        }
      ]
    }
  },
  methods: {
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
    comments () {

    },
    signIn () {
      this.canCom = false
    },
    reply (id) {
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
  .sign-in {
    float:right;
  }
  .comments {
    float:right;
  }
</style>
