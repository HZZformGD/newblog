<template lang="html">
  <form>
    <div class="form-group">
      <mu-text-field   label="标题" fullWidth hintText="文章标题" v-model="tempArticle.title" labelFloat/>
    </div>
    <div class="form-group">
      <mu-text-field   label="类型" fullWidth hintText="不同类型用;隔开" v-model="tempArticle.types" labelFloat/>
    </div>
    <div class="form-group">
      <label>正文</label>
      <Markdown ref="markdown" :sourceContent="tempArticle.sourceContent"></Markdown>
    </div>
    <div class="form-group">
      <mu-flat-button  backgroundColor="#ff4081" label="清空" color="#FFF" @click="clear" />
      <mu-flat-button v-if="!isEditArticle" backgroundColor="#7e57c2" label="发布" color="#FFF" @click="add" />
      <mu-flat-button v-if="isEditArticle" backgroundColor="#7e57c2" label="更改"  color="#FFF" @click="update"/>
    </div>
  </form>
</template>

<script>
import Markdown from '../common/markdown'
export default {
  data () {
    return {
      blankArticle: {}
    }
  },
  computed: {
    tempArticle () {
      let article = this.$store.state.editArticle || {}
      if (article.types instanceof Array) {
        article.types = article.types.join(';')
      }
      return article
    },
    isEditArticle () {
      return this.$store.state.isEditArticle
    }
  },
  methods: {
    clear () {
      this.$store.state.editArticle = {}
      this.$store.state.tempArticle = {}
    },
    async add () {
      let data = this.tempArticle
      data.content = this.$refs.markdown.getHtmlValue()
      data.sourceContent = this.$refs.markdown.getMarkdownValue()
      if (!data.title || !data.content || !data.types) {
        this.$message.error('标题内容和分类必须填写，请重新填写')
        return
      }
      let sta = await this.$store.dispatch('addArticle', data)
      if (sta) {
        this.$confirm('添加成功是否回到列表页？', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '返回',
          type: 'warning'
        }).then(() => {
          this.$router.push('/admin/articleList')
        })
      } else {
        this.$message.error('发布失败，可能是服务器出错了')
      }
    },
    async update () {
      let data = this.tempArticle
      data.content = this.$refs.markdown.getHtmlValue()
      data.sourceContent = this.$refs.markdown.getMarkdownValue()
      let sta = await this.$store.dispatch('updateArticle', data)
      if (sta) {
        this.$confirm('更新成功，是否回到列表？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '返回',
          type: 'success'
        }).then(() => {
          this.$router.push('/admin/articleList')
        })
      } else {
        this.$message.error('更新失败，可能是服务器出错了')
      }
    }
  },
  components: {
    Markdown
  }
}
</script>
