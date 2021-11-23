<template>
  <div class="p-component">
    <div
      v-if="!zenmode && isNotStudent"
    >
      <h2>Choose an assignment</h2>
      <Dropdown
        v-model="selectAssignment"
        :options="assignments"
        optionLabel="title"
        placeholder="Select an assignment"
        @change="assignmentSelected"
      />
    </div>
    <div v-if="assignment">
      <h2>
        {{ assignment.title }}
      </h2>
      <p>{{ assignment.description }}</p>
      <Button
        :disabled="!submitPossible"
        @click="submit"
      >
        {{ buttonText }}
      </Button>
      <h3>Tasks</h3>
      <div class="p-d-flex">
        <Menu
          :model="items"
          class="p-col-12 p-md-2 p-lg-2"
        />
        <Dialog
          v-model:visible="solveDialog"
          header="Solve Task"
          :modal="false"
          :maximizable="true"
          :breakpoints="{'960px': '75vw', '640px': '100vw'}"
          :style="{width: '60vw'}"
        >
          <router-view class="p-col-12 p-md-10 p-lg-9" />
          <template #footer>
            <Button
              label="Previous"
              icon="pi pi-arrow-left"
              class="p-button-text"
              :disabled="!previousTaskId"
              @click="gotoTask(previousTaskId)"
            /><Button
              label="Next"
              icon="pi pi-arrow-right"
              class="p-button-text"
              :disabled="!nextTaskId"
              @click="gotoTask(nextTaskId)"
            />
          </template>
        </Dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { save, getQuery } from '../services/SubmissionService'
const moduleStore = 'assignments'

export default {
  data () {
    return {
      selectAssignment: null,
      submitPossible: false,
      solveDialog: true,
      nextTaskId: null,
      previousTaskId: null
    }
  },
  computed: {
    assignments () {
      return this.$store.state.assignments.all
    },
    assignment () {
      return this.$store.getters[`${moduleStore}/get`](this.assignmentId)
    },
    assignmentId () {
      return Number(this.$route.params.assignmentId || -1)
    },
    taskId () {
      return Number(this.$route.params.taskId || -1)
    },
    buttonText () {
      if (this.submitPossible) {
        return 'Submit assignment'
      } else {
        return 'Assignment already submitted'
      }
    },
    tasks () {
      return this.assignment?.assignmentTasks
    },
    user () {
      return this.$store.state.user
    },
    isNotStudent () {
      return this.user.role !== 'student'
    },
    items () {
      return this.assignment?.assignmentTasks.map(
        v => ({
          // label: `Task ${v.order + 1}`,
          label: this.getTaskTitle(v.taskId),
          icon: 'pi pi-fw pi-pencil',
          to: `/assignmentsolve/${this.assignmentId}/task/${v.taskId}`,
          disabled: this.$store.state.taskInProgress,
          command: this.taskChanged
        })
      )
    },
    zenmode () {
      return this.$store.state.zenmode
    }
  },
  created () {
    this.$watch(
      () => this.$route.params.assignmentId,
      (toParams, previousParams) => {
        this.assignmentChanged()
      }
    )
    this.$watch(
      () => this.$route.params.taskId,
      (newValue, oldValue) => {
        if (newValue) {
          this.taskChanged()
        }
      }
    )
  },
  async mounted () {
    this.assignmentChanged()
  },
  methods: {
    assignmentSelected (event) {
      this.$router.push(`/assignmentsolve/${event.value.id}`)
    },
    async assignmentChanged () {
      if (this.assignmentId >= 0) {
        const submitted = await this.alreadySubmitted()
        this.submitPossible = !submitted
        this.tasks?.sort((a, b) => a.order - b.order)
        this.taskChanged()
      }
    },
    getTaskTitle (taskId) {
      const task = this.$store.state.tasks.find(v => v.id === taskId)
      return task.title
    },
    gotoTask (taskId) {
      this.$router.push(`/assignmentsolve/${this.assignmentId}/task/${taskId}`)
    },
    taskChanged () {
      this.solveDialog = true
      if (this.taskId === -1) {
        this.previousTaskId = null
        this.nextTaskId = this.tasks[0].taskId
        return
      }
      const taskIndex = this.tasks.findIndex(t => t.taskId === this.taskId)
      if (taskIndex === -1) {
        this.previousTaskId = null
        this.nextTaskId = null
        return
      }
      if (taskIndex === 0) {
        this.previousTaskId = null
      } else {
        this.previousTaskId = this.tasks[taskIndex - 1].taskId
      }
      if (taskIndex === this.tasks.length - 1) {
        this.nextTaskId = null
      } else {
        this.nextTaskId = this.tasks[taskIndex + 1].taskId
      }
    },
    submit () {
      save({
        user: Number(this.user.id),
        ltik: this.user.ltik,
        assignment: this.assignmentId,
        level: 'assignment'
      })
      this.submitPossible = false
    },
    async alreadySubmitted () {
      if (this.assignmentId) {
        const submissions = await getQuery(this.assignmentId, this.user.id)
        const submissionsForAssignment = submissions.filter(v => v.level === 'assignment')
        return submissionsForAssignment.length !== 0
      } else {
        return false
      }
    }
  }
}
</script>
