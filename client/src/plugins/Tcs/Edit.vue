<template>
  <TaskEditBase v-model="task">
    <template #header>
      <h1>Regular expression</h1>
    </template>
    <template #details>
      <div class="p-fluid p-grid p-formgrid">
        <div class="p-field p-col-12 p-md-3">
          <label for="re">Regular expression</label>
          <InputText
            id="re"
            v-model="task.details.regexp"
            type="text"
          />
        </div>
        <div class="p-field p-col-12 p-md-3">
          <label for="length">Minimal word length</label>
          <InputNumber
            id="length"
            v-model="task.details.minLength"
          />
        </div>
      </div>
    </template>
    <template #description>
      <div class="p-field p-col-12">
        <label for="description">Description</label>
        <InputText
          id="description"
          v-model="task.description"
          type="text"
        />
      </div>
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
      task: null
    }
  },
  created () {
    this.task = this.modelValue
    if (!this.task.description) {
      this.task.description = 'Give the first word (in lexicographic order) of the language which is described by the following regular expression.'
    }
  }
}
</script>
