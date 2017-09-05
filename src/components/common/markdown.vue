<template lang="html">
  <textarea ref="markdownDOM" id="markdownDOM"></textarea>
</template>

<script>
import SimpleMDE from 'simplemde'

/* eslint-disable no-unused-vars */
import SimpleMDECSS from 'simplemde/dist/simplemde.min.css'
import hljs from 'highlight.js'
export default {
  name: 'markdown',
  props: ['sourceContent'],
  data () {
    return {
      simplemde: null
    }
  },
  mounted () {
    this.created()
    if (this.sourceContent) {
      this.simplemde.value(this.sourceContent)
    } else {
      this.simplemde.value('')
    }
  },
  methods: {
    getMarkdownValue () {
      return this.simplemde.value()
    },
    getHtmlValue () {
      let value = this.simplemde.value()
      return this.simplemde.markdown(value)
    },
    created () {
      const simplemdeDOM = this.$refs.markdownDOM
      // simplemde 源码 return window.hljs.highlightAuto(code).value 所有我们必须把(hljs赋值给window)不然高亮无效
      window.hljs = hljs
      this.simplemde = new SimpleMDE({
        autodownloadfontawesome: false,
        element: simplemdeDOM,
        spellChecker: false,
        forceSync: true,
        autosave: {
          enabled: true,
          unique_id: '#markdownDOM'
        },
        placeholder: 'Type here...',
        renderingConfig: {
          singleLineBreaks: false,
          codeSyntaxHighlighting: true
        },
        toolbar: [
          {
            name: 'bold',
            action: SimpleMDE.toggleBold,
            className: 'fa fa-bold',
            title: 'bold'
          },
          {
            name: 'italic',
            action: SimpleMDE.toggleItalic,
            className: 'fa fa-italic',
            title: 'italic'
          },
          {
            name: 'heading',
            action: SimpleMDE.toggleHeadingSmaller,
            className: 'fa fa-header',
            title: 'heading'
          },
          {
            name: 'quote',
            action: SimpleMDE.toggleBlockquote,
            className: 'fa fa-quote-left',
            title: 'quote'
          },
          {
            name: 'code',
            action: SimpleMDE.toggleCodeBlock,
            className: 'fa fa-code',
            title: 'code'
          },
          {
            name: 'unordered-list',
            action: SimpleMDE.toggleUnorderedList,
            className: 'fa fa-list-ul',
            title: 'unordered-list'
          },
          {
            name: 'ordered-list',
            action: SimpleMDE.toggleOrderedList,
            className: 'fa fa-list-ol',
            title: 'ordered-list'
          },
          {
            name: 'link',
            action: SimpleMDE.drawLink,
            className: 'fa fa-link',
            title: 'link'
          },
          {
            name: 'image',
            action: SimpleMDE.drawImage,
            className: 'fa fa-picture-o',
            title: 'image'
          },
          {
            name: 'preview',
            action: SimpleMDE.togglePreview,
            className: 'fa fa-eye no-disable',
            title: 'preview'
          },
          {
            name: 'side-by-side',
            action: SimpleMDE.toggleSideBySide,
            className: 'fa fa-columns no-disable no-mobile',
            title: 'side-by-side'
          },
          {
            name: 'fullscreen',
            action: SimpleMDE.toggleFullScreen,
            className: 'fa fa-arrows-alt no-disable no-mobile',
            title: 'fullscreen'
          },
          {
            name: 'guide',
            action: 'https://simplemde.com/markdown-guide',
            className: 'fa fa-question-circle',
            title: 'guide'
          }
        ]
      })
    }
  },
  components: {}
}
</script>

<style lang="css">
</style>
