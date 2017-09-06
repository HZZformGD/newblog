<template lang="html">
  <form clsas="form">
    <div clsas="form-group">
      <mu-text-field label="头像的链接" fullWidth  v-model="userInfo.avatar" labelFloat/>
    </div>
    <div clsas="form-group">
      <mu-text-field label="博客名" fullWidth v-model="userInfo.blogTitle" labelFloat/>
    </div>
    <div class="form-group">
      <mu-text-field hintText="一句介绍自己的话" fullWidth  multiLine :rows="3" :rowsMax="4"  v-model="userInfo.motto"/>
    </div>
    <div class="form-group">
      <mu-raised-button label="保存" fullWidth @click="save" backgroundColor="#27cacc"/>
    </div>
  </form>
</template>

<script>
  export default {
    data () {
      return {
      }
    },
    computed: {
      userInfo () {
        return this.$store.state.token.account
      }
    },
    methods: {
      async save () {
        let data = {
          avatar: this.userInfo.avatar,
          blogTitle: this.userInfo.blogTitle,
          motto: this.userInfo.motto,
          account: this.userInfo.name
        }
        let res = await this.$store.dispatch('editUserInfo', data)
        if (res) {
          this.$message({
            type: 'success',
            message: '更新成功'
          })
        } else {
          this.$message.error('网络出错了')
        }
      }
    }
  }
</script>

<style lang="css" scoped>
figure {
  text-align: center;
}
figure img {
  width:50px;
  height: 50px;
  border-radius: 50%;
}
.mrgB10 {
  margin-bottom:10px;
}
</style>

