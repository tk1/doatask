<template>
  <TaskSolveBase>
    <template #details="slotProps">
      <p>
        {{ slotProps.task.details.regexp }}
      </p>
    </template>
    <template #solution="slotProps">
      <span class="p-float-label">
        <InputText
          id="solution"
          v-model="solution.text"
          :disabled="slotProps.alreadySubmitted"
          type="text"
        />
        <label for="solution">Result</label>
      </span>
      <Message
        v-if="submission?.feedback"
        severity="info"
        :closable="false"
      >
        {{ submission.feedback.correct }} |
        Your points: {{ Math.round(100* submission.grade) }} of 100 |
        Your rating: {{ Math.round(submission.rating) }}
      </Message>
      <Button
        :disabled="!solution.text || slotProps.alreadySubmitted"
        @click="submitSolution(slotProps)"
      >
        {{ buttonText(slotProps) }}
      </Button>
    </template>
  </TaskSolveBase>
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      solution: {},
      submission: null
    }
  },
  watch: {
    task (newValue) {
      console.log(`task ${newValue.id}`)
      this.solution = {}
      this.submission = null
    }
  },
  methods: {
    submitSolution: async function (slotProps) {
      this.submission = await slotProps.submit(
        {
          value: this.solution,
          timeNeeded: -1
        }
      )
      slotProps.submitReceived(this.submission)
    },
    buttonText (slotProps) {
      if (slotProps.alreadySubmitted) {
        return 'Already submitted'
      } else if (this.solution.text) {
        return 'Submit solution'
      } else {
        return 'Enter solution'
      }
    }
  }
}
</script>
