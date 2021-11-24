<template>
  <div class="p-component">
    <h2>Choose an assignment</h2>
    <Dropdown
      v-model="selectAssignment"
      :options="assignments"
      optionLabel="title"
      placeholder="Select an assignment"
      @change="assignmentSelected"
    />
    <div v-if="assignment">
      <DataTable
        :value="assignment?.assignmentTasks"
        dataKey="id"
        show-gridlines
        editMode="cell"
        class="p-datatable-sm editable-cells-table"
        @rowReorder="onRowReorder"
        @cellEditComplete="onCellEditComplete"
      >
        <template #empty>
          No tasks found.
        </template>
        <Column
          :rowReorder="true"
          headerStyle="width: 3rem"
          :reorderableColumn="false"
        />
        <Column
          field="taskId"
          header="Id"
        />
        <Column header="Title">
          <template #body="slotProps">
            {{ getTaskTitle(slotProps.data.taskId) }}
          </template>
        </Column>
        <Column
          field="timeLimit"
          header="Time limit"
        >
          <template #editor="slotProps">
            <InputText
              :modelValue="slotProps.data[slotProps.column.props.field]"
              @update:modelValue="onCellEdit($event, 'timeLimit', slotProps)"
            />
          </template>
        </Column>
        <Column
          field="weight"
          header="Weight"
        >
          <template #editor="slotProps">
            <InputText
              :modelValue="slotProps.data[slotProps.column.props.field]"
              @update:modelValue="onCellEdit($event, 'weight', slotProps)"
            />
          </template>
        </Column>
        <Column header="Percent">
          <template #body="slotProps">
            {{ getPercent(slotProps.data) }}
          </template>
        </Column>
        <Column
          headerStyle="width: 5rem; text-align: center"
          bodyStyle="text-align: center; overflow: visible"
          header="Remove"
        >
          <template #body="slotProps">
            <Button
              icon="pi pi-trash"
              class="p-button-rounded p-button-warning"
              @click="removeTaskFromAssignment(slotProps.data.taskId)"
            />
          </template>
        </Column>
      </DataTable>
      <h2>Choose tasks</h2>
      <TasksList
        :preselected="preselected"
        @selected="addTask"
        @unselected="removeTask"
      />
    </div>
  </div>
</template>

<script>
import TasksList from './TasksList.vue'
const moduleStore = 'assignments'

export default {
  components: {
    // AssignmentEdit,
    TasksList
  },
  data () {
    return {
      preselected: [],
      editingCellRows: {},
      selectAssignment: null
    }
  },
  computed: {
    assignments () {
      return this.$store.state.assignments.all
    },
    assignment () {
      return this.$store.getters[`${moduleStore}/get`](this.assignmentId)
    },
    assignmentId () {
      return Number(this.$route.params.assignmentId)
    },
    user () {
      return this.$store.state.user
    }
  },
  created () {
    this.$watch(
      () => this.$route.params.assignmentId,
      (toParams, previousParams) => {
        this.assignmentChanged()
      }
    )
  },
  async mounted () {
    this.assignmentChanged()
  },
  methods: {
    assignmentSelected (event) {
      this.$router.push(`/assignmenttasks/${event.value.id}`)
    },
    assignmentChanged () {
      this.assignment?.assignmentTasks.sort((a, b) => a.order - b.order)
      this.preselected = this.assignment?.assignmentTasks.map(v => v.taskId)
    },
    async addTask (task) {
      this.$store.dispatch(`${moduleStore}/addTask`, {
        assignmentId: this.assignmentId,
        taskId: task.id,
        order: this.assignment.assignmentTasks.length,
        weight: 10
      })
    },
    removeTask (task) {
      this.removeTaskFromAssignment(task.id)
    },
    removeTaskFromAssignment (id) {
      const index = this.assignment.assignmentTasks.findIndex(v => v.taskId === id)
      this.removeAssignedTask(this.assignment.assignmentTasks[index])
    },
    async removeAssignedTask (assignedTask) {
      await this.$store.dispatch(`${moduleStore}/removeTask`, assignedTask)
      this.reorder()
    },
    reorder () {
      for (let i = 0; i < this.assignment.assignmentTasks.length; i++) {
        this.assignment.assignmentTasks[i].order = i
        this.$store.dispatch(`${moduleStore}/updateTask`, this.assignment.assignmentTasks[i])
      }
    },
    onRowReorder (event) {
      this.assignment.assignmentTasks = event.value
      this.reorder()
    },
    onCellEdit (newValue, field, props) {
      if (!this.editingCellRows[props.index]) {
        this.editingCellRows[props.index] = { ...props.data }
      }
      this.editingCellRows[props.index][field] = newValue
    },
    onCellEditComplete (event) {
      if (!this.editingCellRows[event.index]) {
        return
      }
      const editingCellValue = this.editingCellRows[event.index][event.field]
      this.editingCellRows[event.index][event.field] = this.$filters.toNatural(editingCellValue)
      this.assignment.assignmentTasks[event.index] = { ...this.editingCellRows[event.index] }
      this.$store.dispatch(`${moduleStore}/updateTask`, this.assignment.assignmentTasks[event.index])
    },
    getPercent (data) {
      const totalWeight = this.assignment.assignmentTasks.reduce((sum, v) => sum + v.weight, 0)
      return this.$filters.formatPercent(data.weight / totalWeight, 1)
    },
    getTaskTitle (taskId) {
      const task = this.$store.state.tasks.find(v => v.id === taskId)
      return task.title
    }
  }
}
</script>
