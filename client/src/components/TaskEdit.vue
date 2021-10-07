<template>
  <p>
    <component
      :is="pluginComponent"
      v-model="record"
    />
  </p>
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
      record: null
    }
  },
  computed: {
    pluginComponent () {
      return this.pluginName + 'Edit'
    },
    pluginName () {
      return this.record.plugin
    }
  },
  created () {
    this.record = this.modelValue
  }
}
</script>

<style scoped>
.main {
  margin: 5px;
}
</style>
