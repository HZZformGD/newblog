<template>
    <mu-table multiSelectable enableSelectAll :showCheckbox="show" ref="table">
    <mu-thead>
      <mu-tr>
        <mu-th>ID</mu-th>
        <mu-th>昵称</mu-th>
        <mu-th class="avatar">头像</mu-th>
        <mu-th>来自</mu-th>
        <mu-th>加入时间</mu-th>
      </mu-tr>
    </mu-thead>
    <mu-tbody>
      <mu-tr v-for="(item, index) in list"  :key="item._id">
        <mu-td>{{ item._id }}</mu-td>
        <mu-td>{{ item.nickname }}</mu-td>
        <mu-td>
            <mu-list-item  disabled>
                <mu-avatar :src="item.avatar"/>
            </mu-list-item>
        </mu-td>
        <mu-td v-if="Object.is(item.from, '微博')" class="from"><i class="fa fa-weibo"></i>{{ item.from }}</mu-td>
        <mu-td v-else-if="Object.is(item.from, 'github')" class="github"><i class="fa fa-github-alt"></i>{{ item.from }}</mu-td>
        <mu-td>{{ item.addtime }}</mu-td>
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
      return this.$store.getters.getOAuthList
    }
  },
  created () {
    this.oAuthList()
  },
  methods: {
    oAuthList () {
      this.$store.dispatch('oAuthList')
    }
  }
}
</script>

<style scoped>
.avatar{
    text-indent:20px;
}
.from:hover,.from:focus {
    color:#e6162d;
}
.github:hover,.github:focus {
    color:#4a95ce;
}
</style>
