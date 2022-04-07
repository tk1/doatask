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
      <div>
        <label>Dark </label>
        <InputSwitch
          v-model="isDark"
          class="switcher child"
          @change="changeTheme"
        />
      </div>
      <br>
      <MonacoEditor
        ref="MonacoEditor"
        v-model="data"
        @getCode="getCode"
      />
      <div v-show="false">
        {{ getSolution(slotProps) }}
      </div>
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
      <div class="p-fluid p-grid p-formgrid">
        <div class="p-field p-col-12 p-md-2">
          <Button
            :disabled="!submitPossible(slotProps)"
            @click="submitSolution(slotProps)"
          >
            {{ buttonText(slotProps) }}
          </Button>
        </div>
        <div class="p-field p-col-12 p-md-2">
          <Button
            :disabled="!submitPossible(slotProps) || !slotProps.task.savable"
            @click="saveSolution(slotProps)"
          >
            <i
              class="pi pi-fw pi-save"
              style="font-size: 1.1rem; padding-right: 5px;"
            />
            Save Solution
          </Button>
        </div>
        <div class="p-field p-col-12 p-md-2">
          <Button
            @click="getPublicTests()"
          >
            Run tests
          </Button>
        </div>
      </div>

      <Card v-if="publicTests !== null">
        <template #content>
          <div class="testInfos text-xs-right">
            <p class="child">
              Nur fehlgeschlagene Tests
            </p>
            <InputSwitch
              v-model="isJustFailedTests"
              class="switcher child"
              @change="justFailedTests"
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
              <div class="testInfos text-xs-right">
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
      solution: null,
      publicTests: null,
      isDark: true,
      isJustFailedTests: false,
      data: {
        code: '',
        language: ''
      }
    }
  },
  watch: {
    task (newValue) {
      // console.log(`task ${newValue.id}`)
      this.data.code = this.generateFunction(newValue)
      this.data.language = newValue.details.language
      this.solution = null
      this.publicTests = null
    }
  },
  created () {
    this.data.code = this.generateFunction(this.task)
    this.data.language = this.task.details.language
  },
  methods: {
    submitSolution: async function (slotProps) {
      const submission = await slotProps.submit({
        value: this.solution,
        timeNeeded: -1
      })
      slotProps.submitReceived(submission)
    },
    saveSolution: async function (slotProps) {
      const currentSolution = await slotProps.saveSolution({
        value: this.solution,
        timeNeeded: -1
      })
      slotProps.solutionReceived(currentSolution)
    },
    setEditorCode (code) {
      this.$refs.MonacoEditor?.updateCode(code)
    },
    setEditorReadOnly (readOnly) {
      this.$refs.MonacoEditor?.setReadOnly(readOnly)
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
    changeTheme: async function () {
      this.$refs.MonacoEditor?.updateTheme(this.isDark)
    },
    getSolution: async function (slotProps) {
      if (slotProps.alreadySubmitted) {
        this.setEditorCode(slotProps.solution?.text)
        this.setEditorReadOnly(true)
      } else if (slotProps.solutionSaved) {
        this.setEditorCode(slotProps.solution?.text)
        this.setEditorReadOnly(false)
      } else {
        if (this.solution != null) {
          this.$refs.MonacoEditor?.updateCode(this.solution)
        } else {
          this.$refs.MonacoEditor?.updateCode(this.generateFunction(this.task))
          this.setEditorReadOnly(false)
        }
      }
    },
    generateFunction (task) {
      if (task.details.language === 'JavaScript') {
        return (
          'function ' +
        task.details.methodStub.functionName +
        ' (' +
        this.getParameterFormat(task) +
        ')' +
        ' {\n\n' +
        '}')
      } else if (task.details.language === 'Python') {
        return (
          'def ' +
        task.details.methodStub.functionName +
        ' (' +
        this.getParameterFormat(task) +
        ') :' +
        '\n\n' +
        '')
      } else if (task.details.language === 'Java') {
        return (
          'public ' + this.getCorrectJavaType(task.details.methodStub.returnType) + ' ' +
          task.details.methodStub.functionName +
          ' (' +
        this.getParameterFormat(task) +
        ')') +
        ' {\n\n' +
        '}'
      }
    },
    getPublicTests: async function () {
      const testsDto = {
        plugin: 'code',
        task: this.taskId,
        details: this.solution
      }
      this.publicTests = await runPublicTests(testsDto)
      if (this.isJustFailedTests) {
        this.publicTests = this.publicTests.filter(test => !test.testPassed)
      }
    },
    justFailedTests () {
      if (!this.isJustFailedTests) {
        this.publicTests = this.getPublicTests()
      } else {
        this.publicTests = this.publicTests.filter(test => !test.testPassed)
      }
    },
    getCode: function (e) {
      this.solution = e
    },
    getCorrectJavaType (type) {
      if (type === 'string') {
        return 'String'
      } else if (type === 'booleanArray') {
        return 'boolean[]'
      } else if (type === 'stringArray') {
        return 'String[]'
      } else if (type === 'intArray') {
        return 'int[]'
      } else {
        return type
      }
    },
    getParameterFormat (task) {
      let para = ''
      if (task.details.language === 'Java') {
        task.details.methodStub.parameter.map((x, v) => {
          if (v === task.details.methodStub.parameter.length - 1) {
            para = para + this.getCorrectJavaType(x.type) + ' ' + x.name
          } else {
            para = para + this.getCorrectJavaType(x.type) + ' ' + x.name + ', '
          }
          return para
        })
      } else {
        task.details.methodStub.parameter.map((x, v) => {
          if (v === task.details.methodStub.parameter.length - 1) {
            para = para + x.name
          } else {
            para = para + x.name + ', '
          }
          return para
        })
      }
      return para
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
