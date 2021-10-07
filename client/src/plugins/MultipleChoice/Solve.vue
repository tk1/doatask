<template>
  <TaskSolveBase
    :taskId="taskId"
    :assignmentId="assignmentId"
    :rated="rated"
  >
    <template #header="slotProps">
      <h1>Multiple Choice: {{ slotProps.task.title }}</h1>
      <p>Check all correct answers.</p>
      <MarkDown :source="slotProps.task.description || ' '" />
    </template>
    <template #details />
    <template #solution="slotProps">
      <div class="p-fluid p-grid p-formgrid">
        <template
          v-for="(choice, index) in slotProps.task.details.choices"
          :key="index"
        >
          <div class="p-col-12 p-md-12">
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon">
                <Checkbox
                  id="public"
                  v-model="answers[index]"
                  :binary="true"
                />
              </span>
              <MarkDown
                class="p-inputtext"
                :source="choice.text || ' '"
              />
            </div>
          </div>
        </template>
        <Button
          :disabled="!submitPossible(slotProps)"
          @click="submitSolution(slotProps)"
        >
          {{ buttonText(slotProps) }}
        </Button>
      </div>
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
  data () {
    return {
      answers: []
    }
  },
  watch: {
    task (newValue) {
      this.answers = this.task.details.choices.map(v => false)
    }
  },
  created () {
    this.answers = this.task.details.choices.map(v => false)
  },
  methods: {
    submitSolution: async function (slotProps) {
      const submission = await slotProps.submit(
        {
          value: this.answers,
          timeNeeded: -1
        }
      )
      slotProps.submitReceived(submission)
    },
    submitPossible (slotProps) {
      return !slotProps.alreadySubmitted
    },
    buttonText (slotProps) {
      if (slotProps.alreadySubmitted) {
        return 'Already submitted'
      } else {
        return 'Submit solution'
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
