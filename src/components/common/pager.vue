<template lang="html">
  <mu-pagination :total="total" :current="current" :defaultPageSize="limit"   @pageChange="changePage">
  </mu-pagination>
</template>

<script>
export default {
  props: ['limit', 'total'],
  data () {
    return {
      current: 1
    }
  },
  computed: {
  },
  created () {
    console.log(this)
  },
  methods: {
    changePage (page) {
      this.$emit('getArt', page)
    },
    next () {
      if (this.currPage < this.pageSize) {
        this.changePage(this.currPage + 1)
      }
    },
    prev () {
      if (this.currPage > 1) {
        this.changePage(this.currPage - 1)
      }
    }
  }
}
</script>

<style lang="css" scoped>
</style>
