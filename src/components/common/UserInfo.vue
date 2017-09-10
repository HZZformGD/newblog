<template lang="html">
  <div class="user_info_box col-xs-12">
    <div class="col-xs-10 col-xs-offset-1">
      <div class="col-sm-8">
        <router-link to="/backstage/write">
          <figure class="col-sm-3 hidden-sm hidden-xs">
            <img :src="userInfo.avatar" class="user_head_pic"/>
          </figure>
        </router-link>
        <div class="col-sm-8">
          <h1 class="name">{{ userInfo.blogTitle }}</h1>
          <h3 class="motto">{{ userInfo.motto }}</h3>
        </div>
      </div>
      <div class="col-sm-4">
        <ul class="socail-contact_ul">
          <li v-for="item in socialList" key="item._id">
          <mu-icon-button  tooltip="登录" slot="right"  :href="item.path"  class="wei-sign-in"  >
            <i :class="item.src"></i>
          </mu-icon-button>
          </li>
        </ul>
      </div>
    </div>
</div>
</template>

<script>
export default {
  props: ['userInfo', 'socialList']
}
</script>

<style lang="css" scoped>
  .user_info_box {
    background:#fafafa;
    padding:60px 0;
  }
  .user_head_pic {
    width:100px;
    height:100px;
    border-radius: 50%;
  }
  .name {
    font-size:23px;
    margin-bottom: 10px;
  }
  .motto {
    font-size:18px;
    color:#aaa;
  }
  .socail-contact_ul {
    overflow: hidden;
    margin-top: 25px;
  }
  .socail-contact_ul li {
    float: left;
    margin-right:10px;
  }
  .socail-contact_ul img {
    width:30px;
    height:30px;
  }
</style>
