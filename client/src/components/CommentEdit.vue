<template>
  <Rating
    v-model="comment.stars"
    :cancel="false"
  />
  <div class="p-field p-col-6">
    <label for="content">Comment</label>
    <InputText
      id="content"
      v-model="comment.content"
      type="text"
      @input="changed"
    />
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
      comment: null
    }
  },
  created () {
    this.comment = this.modelValue
  },
  methods: {
    changed (event) {
      this.$emit('update:modelValue', this.comment)
    }
  }
}
</script>
