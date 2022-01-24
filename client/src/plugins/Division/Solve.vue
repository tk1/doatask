<template>
  <TaskSolveBase>
    <template #details="slotProps">
      <p>
        Divide {{ slotProps.task.details.number1 }}
        by {{ slotProps.task.details.number2 }}
      </p>
    </template>
    <template #solution="slotProps">
      <div v-show="false">
        {{ getSolution(slotProps) }}
      </div>
      <span class="p-float-label">
        <InputText
          id="solution"
          v-model="solution.text"
          :disabled="slotProps.alreadySubmitted"
          type="text"
          autocomplete="off"
        />
        <label for="solution">Result</label>
      </span>
      <Message
        v-if="submission?.feedback"
        severity="info"
        :closable="false"
      >
        Correct solution: {{ submission.feedback.correct }} |
        Your points: {{ Math.round(100* submission.grade) }} of 100 |
        Your rating: {{ Math.round(submission.rating) }}
      </Message>
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
    getSolution: async function (slotProps) {
      if (slotProps.alreadySubmitted) {
        console.log(slotProps.solution?.text.text)
        this.solution.text = slotProps.solution?.text.text
      }
    },
    grade (slotProps) {
      return Math.floor(100 * slotProps.grade) + ' %'
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
