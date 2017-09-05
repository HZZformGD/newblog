<template lang="html">
  <div class="article-title_list">
    <ul class="col-xs-8 col-xs-offset-2 article-list_ul">
      <li v-for="item in articlesList" :key="item._id">
        <router-link :to="'/home/article/' + item._id" class="title">{{ item.title }}</router-link>
        <time class="time">{{ item.date }}</time>
        <article class="abstract" v-html="item.content"></article>
        <div class="article-info clearfix">
          <div class="pull-left article-author">
            <i class="glyphicon glyphicon-user"></i>
              {{ item.author }}
          </div>
          <div class="pull-left article-type">
            <i class="glyphicon glyphicon-tags"></i>
            <span v-for="type in item.types">
              <router-link :to="type">{{ type }}</router-link>
            </span>
          </div>
          <div class="pull-right">
            <router-link :to="'/home/article/' + item._id">
            <i class="glyphicon glyphicon-fullscreen"></i>
              查看全文
            </router-link>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'articleList',
  computed: {
    articlesList () {
      return this.$store.getters.getArticleList
    }
  }
}
</script>

<style lang="css" scoped>
  article {
    max-height: 330px;
    overflow: hidden;
    position: relative;
  }
  article::before {
    content: "";
    position: absolute;
    bottom: 0;
    height: 30px;
    width: 100%;
    box-shadow: inset 0 -15px 30px #fff;
  }
  .article-list_ul li {
    margin-bottom: 60px;
  }
  .time {
    font-weight: bold;
    color:#555;
    font-size:12px;
    display: block;
    margin-bottom:5px;
    letter-spacing:2px;
    margin-top: 10px;
  }
  .title {
    color:#2c3e50;
    margin: 10px 0 20px 0;
    font-size:30px;
    font-weight: bold;
  }
  .abstract {
    color:#7f8c8d;
    line-height: 1.9;
    font-size:16px;
  }
  .article-info {
    border-top:1px dashed #eee;
    border-bottom:1px dashed #eee;
    height:42px;
    line-height: 42px;
    margin-top:20px;
    padding-left:10px;
  }
  .article-author {
    color:#7f8c8d;
    font-size:10px;
  }
  .article-author i {
    margin-right: 6px;
  }
  .article-type {
    margin-left:30px;
    color:#7f8c8d;
    font-size:10px;
  }
  .article-type i {
    margin-right:6px;
  }
  .article-type a {
    color:#7f8c8d;
    position: relative;
    margin-right: 10px;
  }
  .article-type a::before {
    content: '、';
    position: absolute;
    left:100%;
  }
  .article-type span:last-child a::before{
    content: "";
  }
</style>
