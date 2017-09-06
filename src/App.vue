<template>
  <div id="app">
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {}
}
</script>

<style lang='css'>
html,body{
  width:100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Hiragino Sans GB', 'Microsoft Yahei', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width:100%;
  height: 100%;
  background: rgba(112, 110, 110, 0.01);
}
</style>
