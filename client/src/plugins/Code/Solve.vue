<template>
  <TaskSolveBase
    :taskId="taskId"
    :assignmentId="assignmentId"
    :rated="rated"
  >
    <template #header="slotProps">
      <h1>{{ slotProps.task.title }}</h1>
      <MarkDown :source="slotProps.task.description || ' '" />
    </template>
    <template #details />
    <template #solution="slotProps">
      <div id="container" />
      <div
        v-if="slotProps.grade != null"
        class="grade"
      >
        <i
          class="pi pi-bookmark"
          style="font-size: 0.9rem;"
        />
        Ergebnis : {{ grade(slotProps) }}
      </div>
      <br>
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
          <div class="testInfos text-xs-right">
            <p class="child">
              Nur fehlgeschlagene Tests
            </p>
            <InputSwitch
              v-model="switcherChecked"
              class="switcher child"
              @change="onToggleChanged"
            />
          </div>

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
              <div
                v-if="!test.testPassed"
                class="testInfos text-xs-right"
              >
                <i
                  class="pi pi-exclamation-circle"
                  style="font-size: 0.9rem"
                />
                Erwartete Ausgabe:
                {{ test.expectedOutput }}
              </div>
              <br>
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
    },
    defaultSwitcherChecked: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      solution: this.generateFunctionBody(),
      publicTests: null,
      switcherChecked: this.defaultSwitcherChecked
    }
  },
  watch: {
    task (newValue) {
      console.log(`task ${newValue.id}`)
      this.solution = {}
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
      const submission = await slotProps.submit({
        value: editor.getValue(),
        timeNeeded: -1
      })
      slotProps.submitReceived(submission)
    },
    submitPossible (slotProps) {
      return !slotProps.alreadySubmitted
    },
    grade (slotProps) {
      return Math.floor(100 * slotProps.grade) + ' %'
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
    },
    onToggleChanged () {
      if (!this.switcherChecked) {
        this.publicTests = this.getPublicTests()
      } else {
        this.publicTests = this.publicTests.filter(test => !test.testPassed)
      }
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
    }
    .text-xs-right {
        white-space: nowrap;
        padding-left: 20px;
        width: auto;
        height: auto;
        display:inline-block;
      }
    .child{
        display: inline-block;
        margin-left: 5px;
      }
    .switcher{
              top: 7px;
      }
    .ergebnis{
        background-color: red;
      }
      .grade{
        font-size: 1rem; color:green;
        font-weight: bold;
        width: auto;
        height: auto;
      }
</style>
