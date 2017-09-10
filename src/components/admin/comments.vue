<template>
    <mu-table multiSelectable enableSelectAll :showCheckbox="show" ref="table">
    <mu-thead>
      <mu-tr>
        <mu-th>作者</mu-th>
        <mu-th>给谁</mu-th>
        <mu-th >内容</mu-th>
        <mu-th>文章出处</mu-th>
        <mu-th>评论时间</mu-th>
        <mu-th>是否显示</mu-th>
      </mu-tr>
    </mu-thead>
    <mu-tbody>
      <mu-tr v-for="(item, index) in list"  :key="item._id">
        <mu-td>{{ item.commerId.nickname }}</mu-td>
        <mu-td>{{ item.to_id.nickname }}</mu-td>
        <mu-td > 
          <span class="content">{{ item.replay_comment }}</span>
        </mu-td>
        <mu-td>
          <span class="content">{{ item.articleId.title }}</span></mu-td>
        <mu-td>{{ item.time }}</mu-td>
        <mu-td>
            <mu-switch v-model="item.isShow" class="demo-switch" :id="item._id" ref="switch" @change="changeShow(item.isShow, item._id)"/>
        </mu-td>
      </mu-tr>
    </mu-tbody>
  </mu-table>
</template>

<script>
export default {
  data () {
    return {
      show: false
    }
  },
  computed: {
    list () {
      return this.$store.getters.getComments
    }
  },
  created () {
    this.comments()
  },
  methods: {
    comments () {
      let data = {
        'adminId': '59321aa8a2f622dfa0121015'
      }
      this.$store.dispatch('getComments', data)
    },
    async changeShow (val, id) {
      let query = {
        'commentId': id,
        'show': val
      }
      console.log(val)
      let res = this.$store.dispatch('changeShow', query)
      if (Object.is(res, true)) {
        this.comments()
      }
    }
  }
}
</script>

<style scoped>
.content {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
}

</style>
