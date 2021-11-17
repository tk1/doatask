<template>
  <div class="p-component">
    <h1>
      Manage Assignments
    </h1>
    <Button @click="showCreateDialog">
      Create assignment
    </Button>
    <Dialog
      v-model:visible="createDialogVisible"
      :style="{width: '900px'}"
      header="Create assignment"
      :modal="true"
      :maximizable="true"
      class="p-fluid"
    >
      <AssignmentEdit v-model="assignment" />
      <template #footer>
        <Button
          label="Cancel"
          icon="pi pi-times"
          class="p-button-text"
          @click="hideCreateDialog"
        />
        <Button
          label="Save"
          icon="pi pi-check"
          class="p-button-text"
          @click="save"
        />
      </template>
    </Dialog>
    <AssignmentsList />
  </div>
</template>

<script>
import AssignmentsList from './AssignmentsList.vue'
import AssignmentEdit from './AssignmentEdit.vue'

const moduleStore = 'assignments'

export default {
  components: {
    AssignmentsList,
    AssignmentEdit
  },
  data () {
    return {
      createDialogVisible: false,
      assignment: {
        title: 'Title',
        description: 'Description',
        dueDate: null,
        assignmentTasks: []
      }
    }
  },
  computed: {
    assignments () {
      return this.$store.state.assignments.all
    }
  },
  methods: {
    showCreateDialog () {
      this.createDialogVisible = true
    },
    hideCreateDialog () {
      this.createDialogVisible = false
    },
    async save () {
      this.assignment.owner = this.$store.state.user.id
      await this.$store.dispatch(`${moduleStore}/save`, this.assignment)
      this.hideCreateDialog()
    }
  }
}
</script>
