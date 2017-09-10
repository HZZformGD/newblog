<template>
  <div class="card">
    <mu-card v-if="isReplay">
      <mu-card-header title="回复给他/她" :subTitle="editReply.commerId.nickname">
        <mu-avatar :src="editReply.commerId.avatar" slot="avatar"/>
      </mu-card-header>
      <mu-card-title title="他/她的评论" />
      <mu-card-text>{{ editReply.replay_comment }}</mu-card-text>
      <mu-text-field hintText="写点东西吧···" label="点击这里~" ref="content" class="replyInput" :underlineShow="underlineShow" multiLine :rows="3" fullWidth labelFloat/>
      <mu-card-actions>
        <mu-flat-button icon=":fa fa-reply" label="回复" @click="reply(editReply.commerId._id, editReply.articleId._id)"/>
      </mu-card-actions>
    </mu-card>
    <span v-else>请去列表选择要回复的人</span>
  </div>
</template>

<script>
export default {
  data () {
    return {
      underlineShow: false
    }
  },
  computed: {
    editReply () {
      let editReply = this.$store.state.editReply || {}
      return editReply
    },
    isReplay () {
      return this.$store.state.isReplay
    }
  },
  methods: {
    async reply (toId, articleId) {
      let comment = this.$refs.content.inputValue
      let commerId = '13075210743'
      let data = {
        'replay_comment': comment,
        'articleId': articleId,
        'commerId': commerId,
        'to_id': toId
      }
      let sta = await this.$store.dispatch('commentSub', data)
      if (sta === true) {
        this.$router.push('/admin/comments')
      }
    }
  }
}
</script>


<style scoped>
.reply {
    float: right;
}
.replyInput {
    padding: 0 30px;
}
.underlineClass{
    padding: 0 30px;
}
.card {
    margin-top: 30px;
}
</style>
