<template>
  <div>
    <Toast />
    <Button
      icon="pi pi-download"
      label="Download selected tasks"
      @click="download"
    />
    <FileUpload
      mode="basic"
      accept="application/json"
      :maxFileSize="1000000"
      :auto="true"
      chooseLabel="Upload"
      :customUpload="true"
      @uploader="upload"
    />
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
        selectionMode="multiple"
        headerStyle="width: 3rem"
      />
      <Column
        :sortable="true"
        field="id"
        header="Id"
      />
      <Column
        :sortable="true"
        field="rating"
        header="Rating"
      >
        <template #body="slotProps">
          {{ slotProps.data.rating?.toFixed(0) }}
        </template>
      </Column>
      <Column
        :sortable="true"
        field="title"
        header="Title"
      >
        <template #filter="{filterModel,filterCallback}">
          <InputText
            v-model="filterModel.value"
            type="text"
            class="p-column-filter"
            :placeholder="`Search`"
            @input="filterCallback()"
          />
        </template>
      </Column>

      <Column
        field="owner.name"
        header="Owner"
      >
        <template #filter="{filterModel,filterCallback}">
          <InputText
            v-model="filterModel.value"
            type="text"
            class="p-column-filter"
            :placeholder="`Search`"
            @input="filterCallback()"
          />
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
        field="domain.name"
        header="Domain"
      >
        <template #filter="{filterModel,filterCallback}">
          <InputText
            v-model="filterModel.value"
            type="text"
            class="p-column-filter"
            :placeholder="`Search`"
            @input="filterCallback()"
          />
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
      <Column
        field="public"
        header="public"
      >
        <template #body="{data}">
          <i
            class="pi"
            :class="{'true-icon pi-check-circle': data.public, 'false-icon pi-times-circle': !data.public}"
          />
        </template>
        <template #filter="{filterModel,filterCallback}">
          <TriStateCheckbox
            v-model="filterModel.value"
            @change="filterCallback()"
          />
        </template>
      </Column>
      <Column
        field="savable"
        header="savable"
      >
        <template #body="{data}">
          <i
            class="pi"
            :class="{'true-icon pi-check-circle': data.savable, 'false-icon pi-times-circle': !data.savable}"
          />
        </template>
        <template #filter="{filterModel,filterCallback}">
          <TriStateCheckbox
            v-model="filterModel.value"
            @change="filterCallback()"
          />
        </template>
      </Column>
      <Column
        field="isActive"
        header="active"
      >
        <template #body="{data}">
          <i
            class="pi"
            :class="{'true-icon pi-check-circle': data.isActive, 'false-icon pi-times-circle': !data.isActive}"
          />
        </template>
        <template #filter="{filterModel,filterCallback}">
          <TriStateCheckbox
            v-model="filterModel.value"
            @change="filterCallback()"
          />
        </template>
      </Column>
      <Column
        headerStyle="width: 10rem; text-align: center"
        bodyStyle="text-align: center; overflow: visible"
        header="Edit"
      >
        <template #body="slotProps">
          <Button
            :disabled="!isOwner(slotProps.data)"
            class="p-button-success"
            @click="edit(slotProps.data)"
          >
            <i
              class="pi pi-pencil"
            />
          </Button>
          <Button
            :disabled="!isOwner(slotProps.data) || slotProps.data.isInAssignment"
            class="p-button-warning"
            @click="confirmDelete(slotProps.data)"
          >
            <i
              class="pi pi-trash"
            />
          </Button>
        </template>
      </Column>
    </DataTable>

    <Dialog
      v-model:visible="editDialog"
      :style="{width: '800px'}"
      header="Edit Task"
      :modal="true"
      :maximizable="true"
      class="p-fluid"
    >
      <TaskEdit
        v-model="record"
      />
      <template #footer>
        <Button
          label="Cancel"
          icon="pi pi-times"
          class="p-button-text"
          @click="hideDialog"
        />
        <Button
          label="Save"
          icon="pi pi-check"
          class="p-button-text"
          :disabled="disableSaveButton()"
          @click="saveRecord"
        />
      </template>
    </Dialog>

    <Dialog
      v-model:visible="deleteDialog"
      :style="{width: '450px'}"
      header="Confirm"
      :modal="true"
    >
      <div class="confirmation-content">
        <i
          class="pi pi-exclamation-triangle p-mr-3"
          style="font-size: 2rem"
        />
        <span
          v-if="record"
          class="main"
        >Are you sure you want to delete <b>{{ record.title }}</b>?</span>
      </div>
      <template #footer>
        <Button
          label="No"
          icon="pi pi-times"
          class="p-button-text"
          @click="deleteDialog = false"
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          class="p-button-text"
          @click="deleteRecord"
        />
      </template>
    </Dialog>
  </div>
</template>

<script>
import TaskEdit from './TaskEdit.vue'
import { FilterMatchMode } from 'primevue/api'
import { importTasks } from '../helpers/import.js'
import { exportTasks } from '../helpers/export.js'
import { task } from '../store/task.js'

export default {
  components: {
    TaskEdit
  },
  props: {
    preselected: {
      type: Array,
      default () {
        return []
      }
    }
  },
  emits: ['selected', 'unselected'],
  setup () {
    const record = {}
    return { record }
  },
  data () {
    return {
      editDialog: false,
      deleteDialog: false,
      // record: {},
      selectedRows: [],
      filters: {
        title: { value: null, matchMode: FilterMatchMode.CONTAINS },
        plugin: { value: null, matchMode: FilterMatchMode.CONTAINS },
        'owner.name': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'domain.name': { value: null, matchMode: FilterMatchMode.CONTAINS },
        public: { value: null, matchMode: FilterMatchMode.EQUALS },
        savable: { value: null, matchMode: FilterMatchMode.EQUALS },
        isActive: { value: null, matchMode: FilterMatchMode.EQUALS }
      }
    }
  },
  computed: {
    tasks () {
      return this.$store.state.tasks
    },
    user () {
      return this.$store.state.user
    }
  },
  watch: {
    preselected (newValue) {
      this.setPreselected()
    }
  },
  mounted () {
    this.setPreselected()
  },
  methods: {
    edit (data) {
      this.record = { ...data }
      this.record.details = { ...data.details }
      this.editDialog = true
    },
    confirmDelete (data) {
      this.record = { ...data }
      this.deleteDialog = true
    },
    deleteRecord () {
      this.$store.dispatch('deleteTask', this.record)
      this.deleteDialog = false
      this.$toast.add({
        severity: 'success',
        summary: 'Successful',
        detail: `Task ${this.record.title} deleted`,
        life: 3000
      })
    },
    hideDialog () {
      this.editDialog = false
    },
    saveRecord () {
      this.$store.dispatch('updateTask', this.record)
      this.hideDialog()
    },
    formatDetails (task) {
      const plugin = this.$store.state.plugins.find(p => p.name === task.plugin)
      return plugin.helpers.describe(task.details)
    },
    onRowSelect (event) {
      this.$emit('selected', event.data)
    },
    onRowUnselect (event) {
      this.$emit('unselected', event.data)
    },
    isOwner (data) {
      return data.owner.id === this.user.id
    },
    download () {
      exportTasks(this.selectedRows)
    },
    async upload (event) {
      importTasks(this.$store, event.files[0])
    },
    setPreselected () {
      this.selectedRows = this.tasks.filter(t => this.preselected.includes(t.id))
    },
    disableSaveButton () {
      return task.value.disableButton
    }
  }
}
</script>

<style scoped>
.main {
  margin: 5px;
}
.true-icon {
 color:#256029
}
.false-icon {
 color:#c63737
}
Button i {
  font-size: 0.5rem;
}
</style>
