<template>
  <div>
    <div class="p-field p-col-6">
      <label for="title">Title</label>
      <InputText
        id="title"
        v-model="assignment.title"
        type="text"
        @input="changed"
      />
    </div>
    <div class="p-field p-col-6">
      <label for="description">Description</label>
      <InputText
        id="description"
        v-model="assignment.description"
        type="text"
        @input="changed"
      />
    </div>
    <div class="p-field-checkbox">
      <Checkbox
        id="public"
        v-model="assignment.public"
        :binary="true"
      />
      <label for="public">public</label>
    </div>

    <div class="p-field p-col-6">
      <label for="due">Due date</label>
      <Calendar
        id="due"
        v-model="assignment.dueDate"
        date-format="dd.mm.yy"
        :show-time="true"
        :show-seconds="false"
        @input="changed"
      />
    </div>
  </div>
</template>

<script>

export default {
  props: {
    modelValue: {
      type: Object,
      required: true
    }
  },
  emits: ['update:modelValue'],
  data () {
    return {
      assignment: null
    }
  },
  created () {
    this.assignment = this.modelValue
  },
  methods: {
    changed (event) {
      this.$emit('update:modelValue', this.assignment)
    }
  }
}
</script>
