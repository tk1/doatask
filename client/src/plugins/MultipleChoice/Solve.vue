<template>
  <TaskSolveBase
    :taskId="taskId"
    :assignmentId="assignmentId"
    :rated="rated"
  >
    <template #header="slotProps">
      <div v-if="task.details.isSingleChoice">
        <h1>Single Choice: {{ slotProps.task.title }}</h1>
        <p>Check the correct answer.</p>
      </div>
      <div v-else>
        <h1>Multiple Choice: {{ slotProps.task.title }}</h1>
        <p>Check all correct answers.</p>
      </div>
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
                  @change="changed(index)"
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
      this.answers = this.task.details.choices.map((v) => false)
    }
  },
  created () {
    this.answers = this.task.details.choices.map((v) => false)
  },
  methods: {
    submitSolution: async function (slotProps) {
      const submission = await slotProps.submit({
        value: this.answers,
        timeNeeded: -1
      })
      slotProps.submitReceived(submission)
    },
    submitPossible (slotProps) {
      if (this.task.details.isSingleChoice && !slotProps.alreadySubmitted) {
        return this.isExactlyOneAnswerSelected()
      } else {
        return !slotProps.alreadySubmitted
      }
    },
    buttonText (slotProps) {
      if (slotProps.alreadySubmitted) {
        return 'Already submitted'
      } else {
        return 'Submit solution'
      }
    },
    changed (selectedIndex) {
      if (this.task.details.isSingleChoice) {
        this.answers = this.answers.map((answer, index) => {
          if (selectedIndex !== index) {
            answer = false
          } else {
            answer = true
          }
          return answer
        })
      }
    },
    isExactlyOneAnswerSelected () {
      return this.answers.filter((answer) => answer).length === 1
    }
  }
}
</script>

<style scoped>
span {
  margin: 5px;
}
</style>
