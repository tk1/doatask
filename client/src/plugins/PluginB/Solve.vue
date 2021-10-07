<template>
  <h1>Solve PluginB</h1>
  <TaskSolveBase
    :taskId="taskId"
    :assignmentId="assignmentId"
    :rated="rated"
  >
    <template #details="slotProps">
      <p>Calculate the square of {{ slotProps.task.details.number }}</p>
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
  }
}
</script>
