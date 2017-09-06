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
  </div>
</template>

<script>
export default {
  props: ['articleDetails'],
  data () {
    return {
      reply_words: '',
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
</style>
