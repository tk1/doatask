<template>
  <div class="p-component">
    <h2>Choose an assignment</h2>
    <Dropdown
      v-model="selectedAssignment"
      :options="assignments"
      optionLabel="title"
      placeholder="Select an assignment"
      @change="assignmentSelected"
    />

    <div v-if="showTasks">
      <h2>Choose a task</h2>
      <DataTable
        v-model:selection="selectedTask"
        v-model:filters="filters"
        selectionMode="single"
        class="p-datatable-sm"
        :value="tasks"
        dataKey="id"
        show-gridlines
        responsive-layout="scroll"
        :paginator="true"
        :rows="10"
        filterDisplay="row"
        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        :rowsPerPageOptions="[5, 10, 50]"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
        @rowSelect="onTaskSelect"
      >
        <template #empty>
          No tasks found.
        </template>
        <Column
          selectionMode="single"
          headerStyle="width: 3rem"
        />
        <Column
          :sortable="true"
          field="id"
          header="Id"
        />
        <Column
          :sortable="true"
          field="title"
          header="Title"
        />

        <Column
          header="Owner"
        >
          <template #body="{data}">
            {{ formatOwner(data) }}
          </template>
        </Column>
        <Column
          header="Details"
        >
          <template #body="{data}">
            {{ formatDetails(data) }}
          </template>
        </Column>
        <Column
          :sortable="true"
          field="plugin"
          header="Plugin"
        >
          <template #filter="{filterModel,filterCallback}">
            <InputText
              v-model="filterModel.value"
              type="text"
              :placeholder="`Search`"
              class="p-column-filter"
              @input="filterCallback()"
            />
          </template>
        </Column>
      </DataTable>
      <br><br>
    </div>

    <div
      v-if="showStudents"
      style="width:20%"
    >
      <DataTable
        v-model:selection="selectedStudent"
        v-model:filters="filters"
        class="p-datatable-sm"
        selectionMode="single"
        :value="students"
        dataKey="id"
        show-gridlines
        responsive-layout="scroll"
        :paginator="true"
        :rows="10"
        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        :rowsPerPageOptions="[5, 10, 50]"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
        filterDisplay="row"
        @rowSelect="onStudentSelect"
      >
        <Column
          :sortable="true"
          field="name"
          header="Student"
        >
          <template #filter="{filterModel,filterCallback}">
            <InputText
              v-model="filterModel.value"
              type="text"
              :placeholder="`Search`"
              class="p-column-filter"
              @input="filterCallback()"
            />
          </template>
        </Column>
      </DataTable>
    </div>

    <Dialog
      v-model:visible="solutionDialog"
      header="Solution"
      :modal="false"
      :maximizable="true"
      :breakpoints="{'960px': '75vw', '640px': '100vw'}"
      content-class="dialog"
      :style="{width: '60vw', background:'red!important'}"
    >
      <div :style="[isSubmitted ? {'background-color': '#bfebb7'} : {'background-color': 'rgb(240 241 209)'}]">
        <h1>{{ selectedTask?.title }} </h1>

        <MarkDown :source="selectedTask?.description || ' '" />
        <div v-if="selectedTask.plugin ==='Code'">
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
          <div
            class="grade"
          >
            <i
              class="pi pi-bookmark"
              style="font-size: 0.9rem;"
            />
            Ergebnis : {{ grade() }}
          </div>
          <br>
          <div
            v-if="mySolution != null"
            class="p-field p-col-12 p-md-2"
          >
            <Button
              @click="getPublicTests()"
            >
              Run tests
            </Button>
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
        </div>
      </div>
    </Dialog>
  </div>
  <br>
</template>

<script>
import { runPublicTests } from '../services/TestsService.js'
import { FilterMatchMode } from 'primevue/api'
import { getTasksForAssignment } from '../services/TaskService'
import { getSubmissionByAssignmentAndTask } from '../services/SubmissionService'
import { getSolutionByAssignmentAndTask } from '../services/SolutionService'

export default {
  data () {
    return {
      tasks: [],
      selectedAssignment: null,
      showTasks: false,
      owner: null,
      selectedTask: null,
      filters: {
        title: { value: null, matchMode: FilterMatchMode.CONTAINS },
        plugin: { value: null, matchMode: FilterMatchMode.CONTAINS },
        'owner.name': { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { value: null, matchMode: FilterMatchMode.CONTAINS }
      },
      solutions: [],
      students: [],
      showStudents: false,
      selectedStudent: null,
      solutionDialog: false,
      solution: null,
      publicTests: null,
      isDark: true,
      isJustFailedTests: false,
      data: {
        code: '',
        language: ''
      },
      mySolution: null,
      isSubmitted: false
    }
  },
  computed: {
    assignments () {
      return this.$store.state.assignments.all
    },
    user () {
      return this.$store.state.user
    }
  },

  watch: {
    async selectedTask (newValue) {
      this.$router.push(`/solutions/${this.selectedAssignment.id}/task/${this.selectedTask.id}`)
    },
    solutionDialog: function (newValue, old) {
      if (!newValue) {
        this.showStudents = false
      }
    }
  },
  methods: {
    closeDialog () {
      console.log('Close')
      this.showStudents = false
    },
    getSolution: async function () {
      this.mySolution = this.solutions.filter(s => s.user === this.selectedStudent)[0]
      this.setEditorCode(this.mySolution?.solution?.value)
      this.publicTests = null
      this.checkSubmitted()
    },
    grade () {
      if (this.isSubmitted) {
        return Math.floor(100 * this.mySolution?.grade) + ' %'
      } else {
        return 'Not Submitted!'
      }
    },
    checkSubmitted () {
      if (this.mySolution != null && 'grade' in this.mySolution) {
        this.isSubmitted = true
      } else {
        this.isSubmitted = false
      }
    },

    setEditorCode (code) {
      this.$refs.MonacoEditor?.updateCode(code)
    },

    async assignmentSelected (event) {
      this.$router.push(`/solutions/${event.value.id}`)
      this.showTasks = true
      this.owner = this.selectedAssignment?.owner.name
      await this.getTasksForAssignment(event.value.id)
    },
    async getTasksForAssignment (assignmentId) {
      if (this.user.role === 'teacher' || this.user.role === 'admin') {
        this.tasks = await getTasksForAssignment(assignmentId)
        this.tasks.map(
          v => ({
            to: `/solutions/${this.assignmentId}/task/${v.taskId}`,
            disabled: this.$store.state.taskInProgress
          })
        )
      }
    },
    formatDetails (task) {
      const plugin = this.$store.state.plugins.find(p => p.name === task.plugin)
      return plugin.helpers.describe(task.details)
    },
    formatOwner (task) {
      return this.selectedAssignment.owner.name
    },
    async showStudentsForTask () {
      this.selectedStudent = null
      const submittedSolutions = await getSubmissionByAssignmentAndTask(this.selectedAssignment.id, this.selectedTask.id)
      const savedSolutions = await getSolutionByAssignmentAndTask(this.selectedAssignment.id, this.selectedTask.id)

      const submittedSolutionStudents = submittedSolutions.map(s => s.user)
      const savedSolutionStudents = savedSolutions.map(s => s.user)
      this.solutions = submittedSolutions.concat(savedSolutions)
      this.students = submittedSolutionStudents.concat(savedSolutionStudents)
      this.showStudents = true
    },
    assignmentChanged () {
      this.assignment?.assignmentTasks.sort((a, b) => a.order - b.order)
      this.preselected = this.assignment?.assignmentTasks.map(v => v.taskId)
    },
    onTaskSelect (event) {
      this.$router.push(`/solutions/${this.selectedAssignment.id}/task/${this.selectedTask.id}`)
      this.showStudentsForTask()
      this.showDialogForTask()
    },
    showDialogForTask () {
      this.isSubmitted = false
      this.publicTests = null
      this.data.code = this.generateFunction(this.selectedTask)
      this.data.language = this.selectedTask.details.language
      this.setEditorCode(this.data.code)
      this.solutionDialog = true
    },
    async onStudentSelect () {
      await this.getSolution()
      this.$router.push(`/solutions/${this.selectedAssignment.id}/task/${this.selectedTask.id}`)
      this.solutionDialog = true
    },
    generateFunction (task) {
      if (this.selectedTask.details.language === 'JavaScript') {
        return (
          'function ' +
        this.selectedTask.details.methodStub.functionName +
        ' (' +
        this.selectedTask.details.methodStub.parameter.map((x) => x.name) +
        ')' +
        ' {\n\n' +
        '}')
      } else if (this.selectedTask.details.language === 'Python') {
        return (
          'def ' +
        this.selectedTask.details.methodStub.functionName +
        ' (' +
        this.selectedTask.details.methodStub.parameter.map((x) => x.name) +
        ') :' +
        '\n\n' +
        '')
      }
    },
    pluginComponent () {
      return this.pluginName + 'View'
    },
    pluginName () {
      return this.task.plugin
    },
    changeTheme: async function () {
      this.$refs.MonacoEditor?.updateTheme(this.isDark)
    },
    getPublicTests: async function () {
      const testsDto = {
        plugin: 'code',
        task: this.selectedTask.id,
        details: this.mySolution.solution.value
      }
      console.log(testsDto)
      this.publicTests = await runPublicTests(testsDto)
      console.log(this.publicTests)
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
      if (this.mySolution !== null) { this.mySolution.solution.value = e }
    }
  }
}
</script>
