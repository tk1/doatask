<template>
  <div v-html="getMd()" />
</template>

<script>
import MarkdownIt from 'markdown-it'
import katex from 'markdown-it-katex'
import hljs from 'highlight.js'
import 'katex/dist/katex.min.css'
import 'highlight.js/styles/vs.css'

const md = new MarkdownIt({
  html: true,
  linkify: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        const result = hljs.highlight(str, { language: lang }).value
        return result
      } catch (__) {}
    }

    return '' // use external default escaping
  }
}).use(katex, { throwOnError: false, errorColor: ' #cc0000' })

export default {
  props: {
    source: {
      type: String,
      required: true
    }
  },
  methods: {
    getMd () {
      return md.render(this.source)
    }
  }
}
</script>
