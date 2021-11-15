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
      <Textarea
        id="solution"
        v-model="solution"
        class="sizeTextarea"
        :disabled="slotProps.alreadySubmitted"
        type="text"
      />
      <!-- <label for="solution">Result</label> -->
      <span class="p-float-label">
        <Button
          :disabled="!submitPossible(slotProps)"
          @click="submitSolution(slotProps)"
        >
          {{ buttonText(slotProps) }}
        </Button>
      </span>
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
      console.log(slotProps)
      console.log(this.solution)
      this.submission = await slotProps.submit({
        value: this.solution,
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
      } else if (this.solution.text) {
        return 'Submit solution'
      } else {
        return 'Enter solution'
      }
    }
  }
}
</script>
<style scoped>
  .sizeTextarea {
  height: 200px;
  width: 500px;
  }
</style>
