<template>
  <TaskSolveBase :taskId="taskId">
    <template #header="slotProps">
      <h1>{{ slotProps.task.title }}</h1>
      <MarkDown :source="slotProps.task.description || ' '" />
    </template>
    <template #details />
    <template #solution="slotProps">
      <div id="container" />
      <Button
        :disabled="!submitPossible(slotProps)"
        @click="submitSolution(slotProps)"
      >
        {{ buttonText(slotProps) }}
      </Button>

      <Button @click="getPublicTests()">
        Run tests
      </Button>

      <Card v-if="publicTests !== null">
        <template #content>
          <div
            v-for="(test, index) in publicTests"
            :key="index"
            class="tests"
            :style="[test.testPassed ? {'background-color': '#bfebb7'} : {'background-color': '#f7a3a3'}]"
          >
            <h3>
              Test:
              {{ index + 1 }}

              <i
                v-if="test.testPassed"
                class="pi pi-check checkPassed"
              />
              <i
                v-else
                class="pi pi-times checkFalse"
              />
            </h3>
            <div style="margin-left: 25px;">
              <div class="testInfos text-xs-right">
                <i
                  class="pi pi-arrow-right"
                  style="font-size: 0.9rem"
                />
                Eingabe:
                {{ test.testParameter }}
              </div>
              <br>
              <div class="testInfos text-xs-right">
                <i
                  class="pi pi-arrow-left"
                  style="font-size: 0.9rem"
                />
                Ausgabe:
                {{ test.output }}
              </div>
              <br>
              <div class="testInfos text-xs-right">
                <i
                  class="pi pi-exclamation-circle"
                  style="font-size: 0.9rem"
                />
                Erwartete Ausgabe:
                {{ test.expectedOutput }}
              </div>
              <br>
              <div class="testInfos text-xs-right">
                <i
                  class="pi pi-book"
                  style="font-size: 0.9rem"
                />
                Ergebnis:
                {{ test.testPassed ? "erfolgreich" : "fehlgeschlagen" }}
              </div>
            </div>
          </div>
        </template>
      </Card>
    </template>
  </TaskSolveBase>
</template>

<script>
import { runPublicTests } from '../../services/TestsService.js'

import * as monaco from 'monaco-editor'
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
let editor
export default {
  props: {
    taskId: {
      type: Number,
      required: true
    },
    assignmentId: {
      type: Number,
      default: -1
    },
    task: {
      type: Object,
      required: true
    },
    rated: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      solution: this.generateFunctionBody(),
      submission: null,
      publicTests: null
    }
  },
  watch: {
    task (newValue) {
      console.log(`task ${newValue.id}`)
      this.solution = {}
      this.submission = null

      editor.getModel().setValue(this.generateFunctionBody())
    }
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
      value: this.solution,
      language: 'javascript',
      readOnly: false,
      theme: 'vs-light',
      roundedSelection: false,
      scrollBeyondLastLine: false,
      minimap: false,
      tabSize: 2,
      dimension: { width: 600, height: 300 }
    })
  },
  methods: {
    submitSolution: async function (slotProps) {
      this.submission = await slotProps.submit({
        value: editor.getValue(),
        timeNeeded: -1
      })
      slotProps.submitReceived(this.submission)
    },
    submitPossible (slotProps) {
      return !slotProps.alreadySubmitted
    },
    buttonText (slotProps) {
      if (slotProps.alreadySubmitted) {
        return 'Already submitted'
      } else {
        return 'Submit solution'
      }
    },
    generateFunctionBody () {
      this.publicTests = null
      return (
        'function ' +
        this.task.details.methodStub.functionName +
        ' (' +
        this.task.details.methodStub.parameter.map((x) => x.name) +
        ')' +
        ' {\n\n' +
        '}'
      )
    },
    getPublicTests: async function () {
      const testsDto = {
        plugin: 'code',
        task: this.taskId,
        details: editor.getValue()
      }

      this.publicTests = await runPublicTests(testsDto)
    }
  }
}
</script>
<style>
    .tests{
        width: 1000px;
        margin: auto;
        padding:10px;
        border-style: inset;
        border-width: 3px;

    }
    .checkPassed{
        font-size: 1.6rem; color:green;
    }
        .checkFalse{
        font-size: 1.6rem; color:red;
    }
    .testInfos{
      font-weight: bold;
      white-space:pre-wrap;
    }
    .text-xs-right {
white-space: nowrap;
  padding-left: 20px;
  width: auto;
}
.ergebnis{
  background-color: red;
}
</style>
