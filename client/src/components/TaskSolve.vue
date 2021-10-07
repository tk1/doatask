<template>
  <component
    :is="pluginComponent"
    :taskId="Number(taskId)"
    :assignmentId="Number(assignmentId)"
    :task="task"
    :rated="rated"
  />
</template>

<script>
export default {
  // prevent inheritance of class attribute
  inheritAttrs: false,
  props: {
    taskId: {
      type: [String, Number],
      required: true
    },
    assignmentId: {
      type: [String, Number],
      default: -1
    },
    rated: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    task () {
      const index = this.$store.state.tasks.findIndex(t => t.id === Number(this.taskId))
      if (index === -1) {
        return undefined
      } else {
        return this.$store.state.tasks[index]
      }
    },
    pluginComponent () {
      return this.pluginName + 'Solve'
    },
    pluginName () {
      return this.task.plugin
    }
  }
}
</script>

<style scoped>
.main {
  margin: 5px;
}
</style>
