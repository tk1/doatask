<template>
  <TaskEditBase v-model="task">
    <template #header>
      <h2>PluginA</h2>
    </template>
    <template #details>
      <div class="p-fluid p-grid p-formgrid">
        <div class="p-field p-col-12 p-md-3">
          <label for="number1">Number</label>
          <InputText
            id="number1"
            v-model="task.details.number1"
            type="text"
          />
        </div>
        <div class="p-field p-col-12 p-md-3">
          <label for="number2">Number</label>
          <InputText
            id="number2"
            v-model="task.details.number2"
            type="text"
          />
        </div>
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
  }
}
</script>
