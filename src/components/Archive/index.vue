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
    let stuff = document.querySelector('.vue-scrollbar-transition')
    if (!Object.is(stuff, null)) {
      stuff.style.marginTop = 0
    }
  },
  mounted () {
    let stuff = document.querySelectorAll('.vue-scrollbar-transition')
    if (Object.is(stuff.length, 1)) {
      stuff[0].style.marginTop = 0
    } else if (Object.is(stuff.length, 2)) {
      stuff[0].style.marginTop = 0
      stuff[1].style.top = 0
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
