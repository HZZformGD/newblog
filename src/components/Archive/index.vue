<template>
  <div class="archive-list col-xs-8 col-xs-offset-2">
    <Timeline v-for='(item, index) in archiveList' :item="item" :key="index" :year="item._id" :articleList="item.articleList">
    </Timeline>
  </div>
</template>

<script>
import Timeline from '../common/timeline'

export default {
  name: 'articleList',
  computed: {
    archiveList () {
      return this.$store.getters.getArchiveList
    }
  },
  created () {
    this.getArchive()
    let stuff = document.querySelectorAll('.s_bar>.vue-scrollbar-transition')
    if (!Object.is(stuff[0], null)) {
      stuff[0].style.marginTop = 0
    }
  },
  methods: {
    getArchive () {
      this.$store.dispatch('getArchive')
    }
  },
  components: {
    Timeline
  }
}
</script>

<style lang="css" scoped>
.archive-list {
  margin-bottom: 40px;
}
</style>
