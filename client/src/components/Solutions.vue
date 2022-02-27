<template>
  <div class="p-component">
    <h2>Choose an assignment</h2>
    <Dropdown
      v-model="selectedAssignment"
      :options="assignments"
      optionLabel="title"
      placeholder="Select an assignment"
      @change="assignmentSelected"
    />

    <div v-if="showTasks">
      <h2>Choose a task</h2>
      <DataTable
        v-model:selection="selectedRows"
        v-model:filters="filters"
        class="p-datatable-sm"
        :value="tasks"
        dataKey="id"
        show-gridlines
        responsive-layout="scroll"
        :paginator="true"
        :rows="10"
        filterDisplay="row"
        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        :rowsPerPageOptions="[5, 10, 50]"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
        @rowSelect="onRowSelect"
        @rowUnselect="onRowUnselect"
      >
        <template #empty>
          No tasks found.
        </template>
        <Column
          selectionMode="single"
          headerStyle="width: 3rem"
        />
        <Column
          :sortable="true"
          field="id"
          header="Id"
        />
        <Column
          :sortable="true"
          field="title"
          header="Title"
        />

        <Column
          header="Owner"
        >
          <template #body="{data}">
            {{ formatOwner(data) }}
          </template>
        </Column>
        <Column
          header="Details"
        >
          <template #body="{data}">
            {{ formatDetails(data) }}
          </template>
        </Column>
        <Column
          :sortable="true"
          field="plugin"
          header="Plugin"
        >
          <template #filter="{filterModel,filterCallback}">
            <InputText
              v-model="filterModel.value"
              type="text"
              :placeholder="`Search`"
              class="p-column-filter"
              @input="filterCallback()"
            />
          </template>
        </Column>
      </DataTable>

      <Button
        :disabled="!selectedTask"
        @click="showSolutionsForTask"
      >
        {{ "Show Solutions" }}
      </Button>
    </div>
  </div>
</template>

<script>
import { FilterMatchMode } from 'primevue/api'
import { getTasksForAssignment } from '../services/TaskService'

export default {
  components: {
  },
  data () {
    return {
      tasks: [],
      selectedAssignment: null,
      showTasks: false,
      owner: null,
      selectedTask: false,
      selectedRows: [],
      filters: {
        title: { value: null, matchMode: FilterMatchMode.CONTAINS },
        plugin: { value: null, matchMode: FilterMatchMode.CONTAINS },
        'owner.name': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'domain.name': { value: null, matchMode: FilterMatchMode.CONTAINS },
        public: { value: null, matchMode: FilterMatchMode.EQUALS },
        savable: { value: null, matchMode: FilterMatchMode.EQUALS }
      }
    }
  },
  computed: {
    assignments () {
      return this.$store.state.assignments.all
    },
    user () {
      return this.$store.state.user
    }
  },
  async mounted () {
    // this.assignmentChanged()
  },
  methods: {
    async assignmentSelected (event) {
      console.log(this.selectedAssignment)
      console.log(event.value)
      this.showTasks = true
      this.owner = this.selectedAssignment?.owner.name
      await this.getTasksForAssignment(event.value.id)
    },
    async getTasksForAssignment (assignmentId) {
      if (this.user.role === 'teacher' || this.user.role === 'admin') {
        this.tasks = await getTasksForAssignment(assignmentId)
        console.log(this.tasks)
      }
    },
    formatDetails (task) {
      const plugin = this.$store.state.plugins.find(p => p.name === task.plugin)
      return plugin.helpers.describe(task.details)
    },
    formatOwner (task) {
      return this.selectedAssignment.owner.name
    },
    showSolutionsForTask () {

    },
    assignmentChanged () {
      this.assignment?.assignmentTasks.sort((a, b) => a.order - b.order)
      this.preselected = this.assignment?.assignmentTasks.map(v => v.taskId)
    },
    onRowSelect (event) {
      this.selectedTask = true
      this.$emit('selected', event.data)
    }
  }
}
</script>
