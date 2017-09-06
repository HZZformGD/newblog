<template lang="html">
  <div class="col-xs-8 col-xs-offset-2">
    <div class="articles">
      <span class='title'>{{ articleDetails.title }}</span>
      <article class="aritcle_content" v-html="articleDetails.content"></article>
    </div>
    <div class="comments">
      <mu-list>
        <mu-sub-header>评论区</mu-sub-header>
        <mu-list-item title="这个周末一起吃饭么?">
          <mu-avatar src="/static/logo.png" slot="leftAvatar"/>
          <span slot="describe">
            <span style="color: rgba(0, 0, 0, .87)">Myron Liu -</span> 周末要来你这里出差，要不要一起吃个饭呀，实在编不下去了,哈哈哈哈哈哈
          </span>
        </mu-list-item>
      </mu-list> 
    </div>
  </div>
</template>

<script>
export default {
  props: ['articleDetails']
}
</script>

<style lang="css" scoped>
  .title {
    font-size:30px;
    font-weight: bold;
    color:#666;
    padding:20px 0;
    font-weight: bold;
    letter-spacing: 3px;
  }
  .aritcle_content {
    font-size:16px;
    color:#666;
    margin:30px 0;
    letter-spacing: 2px;
    line-height: 1.5;
  }
  .aritcle_content p {
    text-indent: 2rem;
  }
</style>
