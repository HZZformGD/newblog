<template lang="html">
  <form class="form col-sm-12">
    <div class="form-group">
        <label >原密码</label>
        <input type="password" class="form-control" v-model.trim="oldPassword">
    </div>
    <div class="form-group">
        <label>新密码</label>
        <input type="password" class="form-control" v-model.trim="newPassword">
    </div>
    <div class="form-group">
        <button  class="btn btn-primary btn-lg btn-block" type="button"  @click="submit">提交</button>
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
