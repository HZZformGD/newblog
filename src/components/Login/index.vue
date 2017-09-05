<template lang="html">
  <div class="col-sm-4 col-sm-offset-4 login-module">
    <h1 class="page_title">登录后台管理</h1>
    <form class="form">
      <div class="form-group">
        <label>用户名</label>
        <input type="text" class="form-control" placeholder="username" v-model.trim="account"/>
      </div>
      <div class="form-group">
        <label>密码</label>
        <input type="password" class="form-control" placeholder="password" v-model.trim="password"/>
      </div>
      <div class="clearfix">
        <button type="button" class="btn btn-empty btn-primary btn-block" @click="submitLogin">Login</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      password: null,
      account: null
    }
  },
  methods: {
    submitLogin () {
      if (!this.account || !this.password) {
        this.$message({
          message: '帐号或密码不能为空！',
          type: 'error'
        })
        return
      }
      let userInfo = {
        'account': this.account,
        'password': this.password
      }
      this.$store.dispatch('login', userInfo).then(() => {
        let sta = this.$store.state.loginState
        if (sta === true) {
          this.$router.push('/admin')
        } else {
          this.$message({
            message: '读取不到账号',
            type: 'error'
          })
        }
      })
    }
  }
}
</script>
<style lang="css" scoped>
.login-module{
  box-shadow: 0px 1px 60px #ccc;
  border-radius: 8px;
  padding:20px;
  margin-top:6%;
}
.page_title {
  font-size:40px;
  color:#54387c;
  font-weight: bold;
  text-align: center;
  margin-bottom:20px;
}
.checkbox_label {
  position: relative;
  top:6px;
}
.checkbox_label input {
  vertical-align: top;
}
</style>
