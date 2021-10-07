<template>
  <TaskEditBase v-model="task">
    <template #header>
      <h2>Multiple Choice</h2>
    </template>

    <template #details>
      <div class="p-fluid p-grid p-formgrid">
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
              @change="changed"
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
                    @change="changed"
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
    changed () {
      this.task.details.choices = this.choices.map(v => ({ text: v.text }))
      this.task.details.private.answers = this.choices.map(v => ({ correct: v.correct }))
    },
    addChoice () {
      this.choices.push({ correct: false, text: 'text' })
    }
  }
}
</script>
