<template>
  <div>
    <div class="nav">
      <router-link to="/admin/settings/password" active-class="nav-active">
        <i class="glyphicon glyphicon-lock"></i>
        <span class="hidden-xs">密码修改</span>
      </router-link>
      <router-link to="/admin/settings/userInfo" active-class="nav-active">
        <i class="glyphicon glyphicon-user"></i>
        <span class="hidden-xs">用户信息</span>
      </router-link>
      <router-link to="/admin/settings/navList" active-class="nav-active">
        <i class="glyphicon glyphicon-th-large"></i>
        <span class="hidden-xs">导航栏</span>
      </router-link>
      <router-link to="/admin/settings/social" active-class="nav-active">
        <i class="glyphicon glyphicon-glass"></i>
        <span class="hidden-xs">社交管理</span>
      </router-link>
    </div>
    <router-view></router-view>
    </div>
</template>

<script>
</script>

<style lang="css" scoped>
.nav {
  border-top:1px dashed #eef3f7;
  border-bottom:1px dashed #eef3f7;
  margin-bottom: 30px;
}
.nav a {
  width: 24%;
  display: inline-block;
  padding:20px 0;
  font-size:20px;
  text-align: center;
  color:#1d2b35;
  transition:all 1s;
}
.nav a:hover, .nav-active{
  background: #27cacc;
  color:#fff;
  text-decoration: none;
}
.nav a.nav-active {
  color:#fff;
}
</style>
