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
