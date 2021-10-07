<template>
  <div v-if="!zenmode">
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
    <div class="p-grid">
      <Menu
        :model="items"
        class="p-col-12 p-md-2 p-lg-2"
      />
      <router-view class="p-col-12 p-md-10 p-lg-9" />
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
      submitPossible: false
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
      return Number(this.$route.params.assignmentId)
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
    items () {
      return this.assignment?.assignmentTasks.map(
        v => ({
          // label: `Task ${v.order + 1}`,
          label: this.getTaskTitle(v.taskId),
          icon: 'pi pi-fw pi-pencil',
          to: `/assignmentsolve/${this.assignmentId}/task/${v.taskId}`,
          disabled: this.$store.state.taskInProgress
          // command: this.taskChanged
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
  },
  async mounted () {
    this.assignmentChanged()
  },
  methods: {
    assignmentSelected (event) {
      this.$router.push(`/assignmentsolve/${event.value.id}`)
    },
    async assignmentChanged () {
      const submitted = await this.alreadySubmitted()
      this.submitPossible = !submitted
      this.assignment?.assignmentTasks.sort((a, b) => a.order - b.order)
    },
    getTaskTitle (taskId) {
      const task = this.$store.state.tasks.find(v => v.id === taskId)
      return task.title
    },
    taskChanged () {
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
