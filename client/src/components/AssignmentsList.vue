<template>
  <div>
    <Toast />
    <Button
      icon="pi pi-download"
      label="Download selected assignments"
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
      :value="assignments"
      class="p-datatable-sm"
      dataKey="id"
      show-gridlines
      responsive-layout="scroll"
      :paginator="true"
      :rows="10"
      paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
      :rowsPerPageOptions="[5, 10, 50]"
      currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
      @rowSelect="onRowSelect"
      @rowUnselect="onRowUnselect"
    >
      <template #empty>
        No assignments found.
      </template>
      <Column
        selectionMode="multiple"
        headerStyle="width: 3rem"
      />
      <Column
        field="id"
        header="Id"
      />
      <Column
        field="title"
        header="Title"
      />
      <Column
        field="owner.name"
        header="Owner"
      />
      <Column
        field="description"
        header="Description"
      />
      <Column
        field="dueDate"
        header="Due"
      />
      <Column
        field="public"
        header="public"
      />
      <Column
        headerStyle="width: 10rem; text-align: center"
        bodyStyle="text-align: center; overflow: visible"
        header="Edit"
      >
        <template #body="slotProps">
          <Button
            :disabled="!isOwner(slotProps.data)"
            icon="pi pi-pencil"
            class="p-button-rounded p-button-success p-mr-2"
            @click="edit(slotProps.data)"
          />
          <Button
            :disabled="!isOwner(slotProps.data)"
            icon="pi pi-list"
            class="p-button-rounded p-button-success p-mr-2"
            @click="editTasks(slotProps.data)"
          />
          <Button
            :disabled="!isOwner(slotProps.data)"
            icon="pi pi-trash"
            class="p-button-rounded p-button-warning"
            @click="confirmDelete(slotProps.data)"
          />
        </template>
      </Column>
    </DataTable>
    <Dialog
      v-model:visible="editDialog"
      :style="{width: '450px'}"
      header="Edit assignment"
      :modal="true"
      class="p-fluid"
    >
      <AssignmentEdit v-model="record" />
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
import AssignmentEdit from './AssignmentEdit.vue'
import { importAssignments } from '../helpers/import.js'
import { exportAssignments } from '../helpers/export.js'

const moduleStore = 'assignments'

export default {
  components: {
    AssignmentEdit
  },
  emits: ['selected', 'unselected'],
  data () {
    return {
      editDialog: false,
      deleteDialog: false,
      selectedRows: [],
      record: {}
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
  methods: {
    edit (data) {
      this.record = { ...data }
      this.editDialog = true
    },
    editTasks (data) {
      this.$router.push(`/assignmenttasks/${data.id}`)
    },
    confirmDelete (data) {
      this.record = { ...data }
      this.deleteDialog = true
    },
    deleteRecord () {
      this.$store.dispatch(`${moduleStore}/deleteOne`, this.record)
      this.deleteDialog = false
      this.$toast.add({
        severity: 'success',
        summary: 'Successful',
        detail: `Assignment ${this.record.title} deleted`,
        life: 3000
      })
    },
    hideDialog () {
      this.editDialog = false
    },
    saveRecord () {
      this.$store.dispatch(`${moduleStore}/update`, this.record)
      this.hideDialog()
    },
    onRowSelect (event) {
      this.$emit('selected', event.data.id)
    },
    onRowUnselect (event) {
      this.$emit('unselected', event.data.id)
    },
    isOwner (data) {
      return data.owner.id === this.user.id
    },
    download () {
      exportAssignments(this.$store, this.selectedRows)
    },
    async upload (event) {
      importAssignments(this.$store, event.files[0])
    }
  }
}
</script>

<style scoped>
.main {
  margin: 5px;
}
</style>
