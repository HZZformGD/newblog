<template lang="html">
  <div class="nav-box">
    <i class="glyphicon glyphicon-align-left into_nav_icon" @click="openNav"></i>
    <nav :class="{ active: isActive }">
      <div class="leave_nav_icon_box">
        <i class="glyphicon glyphicon-remove leave_nav_icon" @click="closeNav"></i>
      </div>
      <ul>
        <li v-for='item in navList' key>
          <router-link :to="item.path">{{item.text}}</router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isActive: false
    }
  },
  computed: {
    navList () {
      return this.$store.state.navList
    }
  },
  methods: {
    openNav () {
      this.isActive = !this.isActive
    },
    closeNav () {
      this.isActive = !this.isActive
    }

  }
}
</script>

<style lang="css" scoped>
  .nav-box{
    display: inline;
  }
  nav {
    width: 300px;
    height: 100%;
    position: fixed;
    top:0;
    right:-300px;
    transition:all 200ms ease-out;
    background:#333;
    padding:30px 0;
    text-align: inherit;
  }
  .active{
    right: 0;
  }
  nav ul {
    margin-top:30px;
  }
  nav li {
    color:#8cc9ad;
    font-size:16px;
    position: relative;
    cursor: pointer;
    padding:0 30px 0 20px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    transition:all 280ms ease-out;
    text-align: left;
  }
  nav li a {
    color:#8cc9ad;
  }
  nav li::after {
    content: "";
    position: absolute;
    right: 24px;
    top:50%;
    margin-top:-2px;
    width:4px;
    height: 4px;
    background:#8cc9ad;
    border-radius: 50%;
  }
  nav li:hover{
    background:#292727;
  }
  nav li:hover a {
    color:#fff;
  }
  .into_nav_icon {
    cursor: pointer;
    font-size:20px;
  }
  .leave_nav_icon_box {
    text-align: right;
    padding-right:10px;
  }
  .leave_nav_icon {
    color:#fff;
    font-size: 30px;
  }
  .leave_nav_icon:hover{
    transform: rotate(360deg);
    transform-origin: center;
    transition-duration: 1s;
  }
</style>
