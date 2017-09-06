<template lang="html">
  <div class="table-responsive">
    <table class="table table-hover table-striped">
      <thead>
        <tr>
          <th>标题</th>
          <th>类型</th>
          <th>发表日期</th>
          <th>编辑</th>
        </tr>
      </thead>
      <tbody class="table-striped">
        <tr v-for="(item, index) in articleList :key="item.reply_id"">
          <td>{{ item.title }}</td>
          <td class="type_td">
            <span v-for="type in item.types">{{ type }}</span>
          </td>
          <td>{{ item.date }}</td>
          <td>
            <mu-flat-button  backgroundColor="#7e57c2" label="更改" color="#FFF" @click="editArticle(index)"/>
            <mu-flat-button  backgroundColor="#ff4081" label="删除" color="#FFF" @click="removeArticle(index)"/>
          </td>
        </tr>
      </tbody>
    </table>
    <Pager :limit="limit" ref="pager"></Pager>
  </div>
</template>

<script>
import Pager from '../common/pager'

export default {
  data () {
    return {
      limit: 10
    }
  },
  computed: {
    articleList () {
      let newArticles = this.$store.getters.getArticleList
      return newArticles
    }
  },
  created () {
    this.getArticle(this.$store.state.currPage)
  },
  methods: {
    getArticle (skip) {
      var options = {
        limit: this.limit,
        skip: skip
      }
      this.$store.dispatch('getArticle', options)
    },
    removeArticle (index) {
      this.$confirm('是否要删除本篇文章', '警告！！', {
        confirmButtonText: '确定',
        cancelButtonText: '返回',
        type: 'warning'
      }).then(async () => {
        let sta = await this.$store.dispatch('removeArticle', index)
        if (sta) {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
        } else {
          this.$message.error('删除出错了，可能是服务器引起的')
        }
      })
    },
    editArticle (index) {
      this.$store.dispatch('editArticle', index)
      this.$router.push({path: '/admin/post'})
    }
  },
  components: {
    Pager
  }
}
</script>

<style lang="css">
thead th {
  font-size:20px;
}
.type_td span {
  display: inline-block;
  margin-right: 10px;
}
.table-responsive {
  border: none;
}
.table > tbody > tr > td {
  font-size:16px;
  vertical-align: inherit;
}
</style>
