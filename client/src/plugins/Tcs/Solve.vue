<template>
  <TaskSolveBase>
    <template #details="slotProps">
      <MarkDown :source="toLatex(slotProps.task.details.regexp)" />
    </template>
    <template #solution="slotProps">
      <span class="p-field p-col-12 p-md-3">
        <label for="solution">Word</label>
        <InputText
          id="solution"
          v-model="solution.text"
          :disabled="slotProps.alreadySubmitted"
          type="text"
        />
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
    },
    toLatex (text) {
      return '$' + text.replaceAll('*', '^*') + '$'
    }
  }
}
</script>
