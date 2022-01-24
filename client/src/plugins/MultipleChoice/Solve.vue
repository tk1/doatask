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
      <div
        v-show="false"
      >
        {{ getSolution(slotProps) }}
      </div>
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
                  :disabled="slotProps.alreadySubmitted"
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
      answers: [],
      elementSelected: false
    }
  },
  watch: {
    task (newValue) {
      this.answers = this.task.details.choices.map((v) => false)
      this.elementSelected = false
    }
  },
  created () {
    this.answers = this.task.details.choices.map((v) => false)
    this.elementSelected = false
  },
  methods: {
    submitSolution: async function (slotProps) {
      const submission = await slotProps.submit({
        value: this.answers,
        timeNeeded: -1
      })
      slotProps.submitReceived(submission)
    },
    getSolution: async function (slotProps) {
      if (!this.elementSelected) {
        if (slotProps.alreadySubmitted) {
          this.answers = slotProps.solution?.text
        } else {
          this.answers = this.task.details.choices.map((v) => false)
        }
      }
    },
    submitPossible (slotProps) {
      if (!slotProps.alreadySubmitted) {
        if (this.task.details.isSingleChoice) {
          return this.isExactlyOneAnswerSelected()
        } else {
          return this.isAnswersSelected()
        }
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
    grade (slotProps) {
      return Math.floor(100 * slotProps.grade) + ' %'
    },
    changed (selectedIndex) {
      this.elementSelected = true
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
    },
    isAnswersSelected () {
      return this.answers.filter((answer) => answer).length >= 1
    }
  }
}
</script>

<style scoped>
span {
  margin: 5px;
}
 .grade{
        font-size: 1rem; color:green;
        font-weight: bold;
        width: auto;
        height: auto;
      }
</style>
