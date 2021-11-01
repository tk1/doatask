<template>
  <TaskEditBase v-model="task">
    <template #header>
      <h2>Multiple Choice</h2>
    </template>

    <template #details>
      <div class="p-fluid p-grid p-formgrid">
        <div class="p-fluid p-grid p-formgrid">
          <div class="p-field-checkbox">
            <Checkbox
              id="singleChoice"
              v-model="task.details.isSingleChoice"
              :binary="true"
              @change="singleChoiceChanged()"
            />
            <label for="singleChoice">Single Choice Mode</label>
          </div>
        </div>
        <template
          v-for="(choice, index) in choices"
          :key="index"
        >
          <h4 class="p-col-12">
            Choice {{ index+1 }}
          </h4>
          <div class="p-field-checkbox p-col-1">
            <Checkbox
              id="public"
              v-model="choice.correct"
              :binary="true"
              @change="changed(index)"
            />
          </div>
          <div class="p-field p-col-11 p-md-11">
            <Splitter class="p-col-12">
              <SplitterPanel :size="60">
                <div class="p-field">
                  <Textarea
                    :id="getId(index)"
                    v-model="choice.text"
                    type="text"
                    @change="changed(index)"
                  />
                </div>
              </SplitterPanel>
              <SplitterPanel>
                <MarkDown :source="choice.text || ' '" />
              </SplitterPanel>
            </Splitter>
          </div>
        </template>
      </div>
      <Button @click="addChoice">
        Add Choice
      </Button>
    </template>
  </TaskEditBase>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      task: null,
      choices: []
    }
  },
  created () {
    this.task = this.modelValue
    if (!this.task.details.choices) {
      this.choices = [
        { correct: true, text: 'first' },
        { correct: false, text: 'second' },
        { correct: false, text: 'third' }
      ]
    } else {
      this.choices = this.task.details.choices.map((v, i) =>
        ({ text: v.text, correct: this.task.details.private.answers[i].correct }))
    }
  },
  methods: {
    getId (index) {
      return `id${index}`
    },
    changed (index) {
      if (this.task.details.isSingleChoice) {
        this.choices.filter(choice => choice.index !== index).forEach(choice => { choice.correct = false })
        this.choices[index].correct = true
      } else {
        this.task.details.choices = this.choices.map(v => ({ text: v.text }))
        this.task.details.private.answers = this.choices.map(v => ({ correct: v.correct }))
      }
    },
    singleChoiceChanged () {
      if (this.task.details.isSingleChoice) {
        const correctChoices = this.choices.filter(choice => choice.correct)
        if (correctChoices.length > 1) {
          for (let i = 1; i < correctChoices.length; i++) {
            correctChoices[i].correct = false
          }
        } else if (correctChoices.length === 0) {
          if (this.choices.length > 0) {
            this.choices[0].correct = true
          }
        }
      }
    },
    addChoice () {
      this.choices.push({ correct: false, text: 'text' })
    }
  }
}
</script>
