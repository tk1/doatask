<template>
  <div class="main">
    <Toast />
    <ProgressBar
      v-if="isTimed && !alreadySubmitted"
      style="height: 2em"
      :value="elapsedPercent"
    >
      {{ elapsedText }}
    </ProgressBar>
    <slot
      name="header"
      :task="task"
    >
      <h1>{{ task.title }}</h1>
      <p>{{ task.description }}</p>
    </slot>
    <slot
      name="details"
      :alreadySubmitted="alreadySubmitted"
      :solutionSaved="solutionSaved"
      :task="task"
      @submitted="submitReceived"
    />
    <slot
      name="solution"
      :solution="solution"
      :task="task"
      :submit="getSubmit()"
      :submitReceived="submitReceived"
      :saveSolution="getSaveSolution()"
      :solutionReceived="solutionReceived"
      :alreadySubmitted="alreadySubmitted"
      :solutionSaved="solutionSaved"
      :grade="grade"
    >
      <span class="p-float-label">
        <InputText
          id="solution"
          v-model="solution.text"
          :disabled="alreadySubmitted"
          type="text"
          autocomplete="off"
        />
        <label for="solution">Result</label>
      </span>
      <Button
        :disabled="!submitPossible"
        @click="submitSolution"
      >
        {{ buttonText }}
      </Button>
    </slot>
    <Comments
      v-if="alreadySubmitted"
      :taskId="taskId"
    />
  </div>
</template>

<script>
import { save, getQuery } from '../services/SubmissionService'
import { saveCurrentSolution, getCurrentSolutionQuery } from '../services/SolutionService'
import Comments from './Comments.vue'

const moduleStore = 'assignments'

export default {
  components: {
    Comments
  },
  props: {
    taskId: {
      type: Number,
      required: true
    },
    assignmentId: {
      type: Number,
      default: -1
    },
    rated: {
      type: Boolean,
      default: true
    }
  },
  emits: ['timeOver'],
  data () {
    return {
      solution: {
        text: null
      },
      submission: null,
      alreadySubmitted: false,
      solutionSaved: false,
      elapsedSeconds: 0,
      grade: null
    }
  },
  computed: {
    task () {
      const index = this.$store.state.tasks.findIndex(t => t.id === this.taskId)
      if (index === -1) {
        return undefined
      } else {
        return this.$store.state.tasks[index]
      }
    },
    assignment () {
      if (this.assignmentId < 0) {
        return null
      } else {
        return this.$store.getters[`${moduleStore}/get`](this.assignmentId)
      }
    },
    assignmentTask () {
      return this.assignment?.assignmentTasks.find(v => v.taskId === this.taskId)
    },
    assignmentTaskId () {
      return this.assignmentTask?.id
    },
    isTimed () {
      return this.assignmentTask?.timeLimit
    },
    pluginComponent () {
      return this.pluginName + 'Solve'
    },
    pluginName () {
      return this.task.plugin
    },
    user () {
      return this.$store.state.user
    },
    submitPossible () {
      return this.solution.text && !this.alreadySubmitted
    },
    buttonText () {
      if (this.alreadySubmitted) {
        return 'Already submitted'
      } else if (this.solution.text) {
        return 'Submit solution'
      } else {
        return 'Enter solution'
      }
    },
    inProgress () {
      return this.$store.state.taskInProgress
    },
    elapsedText () {
      if (this.elapsedPercent > 100) {
        return 'Time over'
      } else {
        return `${this.elapsedSeconds} of ${this.assignmentTask.timeLimit} seconds`
      }
    },
    elapsedPercent () {
      return 100 * this.elapsedSeconds / this.assignmentTask.timeLimit
    }
  },

  watch: {
    async task (newValue) {
      this.taskChanged()
    }
  },
  mounted () {
    this.taskChanged()
  },
  beforeUnmount () {
    this.endProgress()
  },
  methods: {
    async taskChanged () {
      this.endProgress()
      await this.getSubmissions()
      if (!this.alreadySubmitted) {
        await this.getSolutions()
      }
      console.log('taskChanged')
      if (this.isTimed && !this.alreadySubmitted) {
        this.restartTimer()
      }
    },
    getSubmit () {
      const that = this
      return function (solution) {
        that.endProgress()
        return save({
          plugin: that.pluginName,
          solution,
          user: Number(that.user.id),
          ltik: that.user.ltik,
          assignment: that.assignmentId,
          assignmentTask: Number(that.assignmentTaskId),
          task: that.taskId,
          rated: that.rated
        })
      }
    },
    getSaveSolution () {
      const that = this
      return function (solution) {
        that.endProgress()
        return saveCurrentSolution({
          userId: Number(that.user.id),
          assignmentTaskId: Number(that.assignmentTaskId),
          taskId: Number(that.taskId),
          assignmentId: Number(that.assignmentId),
          solution: solution
        })
      }
    },
    submitSolution: async function () {
      const submit = this.getSubmit()
      const submission = await submit(
        {
          value: this.solution.text,
          timeNeeded: -1
        }
      )
      this.submitReceived(submission)
    },
    saveCurrentSolution: async function () {
      const saveSolution = this.getSaveSolution()
      await saveSolution(
        {
          value: this.solution.text,
          timeNeeded: -1
        }
      )
      this.solutionReceived()
    },
    solutionReceived (currentSolution) {
      this.solutionSaved = true
      this.$toast.add({
        severity: 'success',
        summary: 'Saved',
        detail: 'Your Solution was saved !',
        life: 5000
      })
    },
    submitReceived (submission) {
      this.alreadySubmitted = true
      this.grade = submission.grade
      this.$toast.add({
        severity: 'success',
        summary: 'Submitted',
        detail: `You got ${Math.floor(100 * submission.grade)} percent.`,
        life: 5000
      })
    },
    async getSubmissions () {
      const submissions = await getQuery(this.assignmentId, this.user.id)
      const submissionsForTask = submissions.filter(v =>
        v.level === 'assignment' ||
        (v.level === 'task' && v.assignmentTask.id === this.assignmentTaskId)
      )
      if (submissionsForTask.length === 0) {
        this.submission = null
        this.alreadySubmitted = false
        this.grade = null
        this.solution.text = null
      } else {
        this.submission = submissionsForTask[0]
        this.alreadySubmitted = true
        this.grade = submissionsForTask[0].grade
        this.solution.text = submissionsForTask[0].solution.value
      }
    },
    async getSolutions () {
      const savedSolution = await getCurrentSolutionQuery(this.assignmentTaskId, this.user.id)
      if (savedSolution?.assignmentTaskId === this.assignmentTaskId) {
        this.solutionSaved = true
        this.solution.text = savedSolution.solution.value
      } else {
        this.solutionSaved = false
        this.solution.text = null
      }
    },
    restartTimer () {
      this.endProgress()
      this.elapsedSeconds = 0
      this.startTime = Date.now()
      setTimeout(() => {
        this.startProgress()
      }, 100)
    },
    startProgress () {
      this.$store.commit('setProperty', { propName: 'taskInProgress', value: true })
      this.interval = setInterval(() => {
        this.elapsedSeconds = Math.round((Date.now() - this.startTime) / 1000)
        if (this.elapsedSeconds > this.assignmentTask.timeLimit) {
          this.endProgress()
          this.$emit('timeOver', {
            submit: this.getSubmit(),
            submitReceived: this.submitReceived
          })
        }
      }, 1000)
    },
    endProgress () {
      if (this.interval) {
        this.$store.commit('setProperty', { propName: 'taskInProgress', value: false })
        clearInterval(this.interval)
        this.interval = null
      }
    }
  },
  interval: null,
  startTime: null
}
</script>

<style scoped>
.main {
  margin: 5px;
}
.p-progressbar-label {
  display: initial;
}
</style>
