<template lang="html">
  <form class="form col-sm-12">
    <div class="form-group">
        <mu-text-field type="password" fullWidth label="原密码" v-model.trim="oldPassword" labelFloat/>
    </div>
    <div class="form-group">
        <mu-text-field type="password" fullWidth label="新密码" v-model.trim="newPassword" labelFloat/>
    </div>
    <div class="form-group">
        <mu-raised-button fullWidth backgroundColor="#27cacc" label="提交"  @click="submit" primary/>
    </div>
  </form>
</template>

<script>
  export default {
    data () {
      return {
        oldPassword: '',
        newPassword: ''
      }
    },
    methods: {
      async submit () {
        let data = {
          oldPassword: this.oldPassword,
          newPassword: this.newPassword,
          id: this.$store.state.token.id
        }
        let sta = await this.$store.dispatch('changePSW', data)
        if (sta) {
          this.$message({
            type: 'success',
            message: '修改密码成功'
          })
        } else {
          this.$message.error('修改出错，请检查原始密码')
        }
      }
    }
  }
</script>

<style lang="css">
</style>
