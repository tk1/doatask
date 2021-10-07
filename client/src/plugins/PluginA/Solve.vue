<template>
  <TaskSolveBase
    :taskId="taskId"
    :assignmentId="assignmentId"
    :rated="rated"
  >
    <template #header="slotProps">
      <h1>PluginA: {{ slotProps.task.title }}</h1>
      <p>{{ slotProps.task.description }}</p>
    </template>
    <template #details="slotProps">
      <p>Calculate the sum of {{ slotProps.task.details.number1 }} and {{ slotProps.task.details.number2 }}</p>
    </template>
    <template #solution="slotProps">
      <span class="p-float-label">
        <InputText
          id="solution"
          v-model="slotProps.solution.text"
          :disabled="slotProps.alreadySubmitted"
          type="text"
        />
        <label for="solution">Result</label>
      </span>
      <Button
        :disabled="!submitPossible(slotProps)"
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
  methods: {
    submitSolution: async function (slotProps) {
      const submission = await slotProps.submit(
        {
          value: slotProps.solution.text,
          timeNeeded: -1
        }
      )
      slotProps.submitReceived(submission)
    },
    submitPossible (slotProps) {
      return slotProps.solution.text && !slotProps.alreadySubmitted
    },
    buttonText (slotProps) {
      if (slotProps.alreadySubmitted) {
        return 'Already submitted'
      } else if (slotProps.solution.text) {
        return 'Submit solution'
      } else {
        return 'Enter solution'
      }
    }
  }
}
</script>

<style scoped>
  span {
  margin: 5px;
  }
</style>
