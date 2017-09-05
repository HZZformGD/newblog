<template lang="html">
  <ul>
    <li class="timeline-li">
      <div class="timeline-border"></div>
      <div class="timeline-round"></div>
      <div class="timeline-content">
        <div class="timeline-year">{{ year }}</div>
        <div class="timeline-list">
          <p class="article-title" v-for="item in articleList">{{ item.title }}<time>{{ item.time }}</time></p>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: ['year', 'articleList']
}
</script>

<style lang="css">
.timeline-li {
  list-style: none;
  position: relative;
  padding-left:16px;
}
.timeline-li .timeline-border {
  height: 100%;
  border-left: 1px solid #e3e8ee;
  position: absolute;
  left:8px;
  top:0;
}
.timeline-li .timeline-round {
  width:16px;
  height:16px;
  border-radius: 50%;
  border:1px solid transparent;
  position: absolute;
  background: #fff;
  color:red;
  border-color: red;
  left:0;
  top:0;
}
.timeline-li .timeline-content {
  padding:1px 1px 10px 20px;
  position: relative;
  top:-3px;
}
.timeline-li .timeline-year {
  font-size:22px;
  font-weight: bold;
  color: rgb(101, 113, 128);
}
.timeline-li .timeline-list {
  padding-left:10px;
  margin-top:20px;
}
.timeline-li .timeline-list .article-title {
  margin-bottom:20px;
  cursor: pointer;
}
.timeline-li .timeline-list time {
  float: right;
}
</style>
