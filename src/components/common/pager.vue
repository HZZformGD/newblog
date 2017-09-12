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
  },
  methods: {
    changePage (page) {
      this.$emit('getArt', page)
    }
  }
}
</script>

<style lang="css" scoped>
</style>
