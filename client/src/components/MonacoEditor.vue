<template>
  <div>
    <div
      id="container"
    />
  </div>
</template>

<script>
/* eslint-disable new-cap */
import * as monaco from 'monaco-editor'
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'

let editor

export default {
  components: {
  },
  props: {
    modelValue: {
      type: Object,
      required: true
    }
  },
  emits: ['getCode:data'],
  data () {
    return {
      language: null,
      enteredData: null
    }
  },
  watch: {
    task () {
      editor.getModel().setValue(this.data.code)
    }
  },
  created () {
    console.log(this.modelValue)
    this.data = this.modelValue

    this.language = this.data.language
    this.enteredData = this.data.code
  },
  mounted () {
    self.MonacoEnvironment = {
      getWorker (_, label) {
        if (label === 'json') {
          return new jsonWorker()
        }
        if (label === 'css' || label === 'scss' || label === 'less') {
          return new cssWorker()
        }
        if (label === 'html' || label === 'handlebars' || label === 'razor') {
          return new htmlWorker()
        }
        if (label === 'typescript' || label === 'javascript') {
          return new tsWorker()
        }
        return new editorWorker()
      }
    }

    editor = monaco.editor.create(document.getElementById('container'), {
      value: this.enteredData,
      language: this.language.toLowerCase(),
      theme: 'vs-dark',
      roundedSelection: false,
      scrollBeyondLastLine: true,
      minimap: false,
      tabSize: 2,
      dimension: { width: 1000, height: 400 }
    })

    const mouseTarget = document.getElementById('container')
    mouseTarget.addEventListener('mouseleave', e => {
      this.$emit('getCode', editor.getValue())
    })
  },
  methods: {
    updateTheme (isDark) {
      if (isDark === true) {
        monaco.editor.setTheme('vs-dark')
      } else if (isDark === false) {
        monaco.editor.setTheme('vs-light')
      }
    },
    updateCode (code) {
      editor.getModel().setValue(code)
    },
    setReadOnly (readOnly) {
      editor.updateOptions({ readOnly: readOnly })
    }
  }
}
</script>
