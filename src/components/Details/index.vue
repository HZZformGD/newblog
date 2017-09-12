<template>
    <div>
        <BodyComponent :articleDetails="articleDetails"></BodyComponent>
    </div>
</template>

<script>
import BodyComponent from './body'

export default {
  name: 'articleDetails',
  computed: {
    articleDetails () {
      return this.$store.state.articleDetails
    }
  },
  created () {
    this.getArticleDetails()
    this.hidePagerComponent()
    let stuff = document.querySelectorAll('.s_bar>.vue-scrollbar-transition')
    if (!Object.is(stuff[0], null)) {
      stuff[0].style.marginTop = 0
    }
  },
  mounted () {
    let stuff = document.querySelectorAll('.s_bar>.vue-scrollbar-transition')
    if (!Object.is(stuff[0], null)) {
      stuff[0].style.marginTop = 0
    }
  },
  methods: {
    getArticleDetails () {
      this.$store.dispatch('getArticleDetails', this.$route.params.id)
    },
    hidePagerComponent () {
      this.$store.dispatch('changePagerStatus', false)
    }
  },
  destroyed () {
    this.$store.dispatch('changePagerStatus', true)
  },
  components: {
    BodyComponent
  }
}
</script>
