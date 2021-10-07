<template>
  <p>Edit role or active</p>
  <DataTable
    v-model:selection="selectedRows"
    :value="users"
    editMode="cell"
    class="p-datatable-sm editable-cells-table"
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
      No users found.
    </template>

    <Column
      field="id"
      header="Id"
    />
    <Column
      field="name"
      header="Name"
    />
    <Column
      field="email"
      header="Email"
    />
    <Column
      field="role"
      header="Role"
      style="width:25%"
    >
      <template #editor="slotProps">
        <Dropdown
          v-model="slotProps.data.role"
          :options="roles"
          optionLabel="label"
          optionValue="value"
          @change="updateRecord(slotProps.data)"
        />
      </template>
      <template #body="slotProps">
        {{ getRoleLabel(slotProps.data.role) }}
      </template>
    </Column>
    <Column
      field="origin"
      header="Origin"
    />
    <Column
      field="ltiid"
      header="LTI Id"
    />
    <Column
      field="isActive"
      header="Active"
    >
      <template #body="slotProps">
        <Checkbox
          v-model="slotProps.data.isActive"
          :binary="true"
          @change="updateRecord(slotProps.data)"
        />
      </template>
    </Column>
  </DataTable>
</template>

<script>
import { getAll, update } from '../services/UserService.js'

export default {

  emits: ['selected', 'unselected'],
  data () {
    return {
      selectedRows: [],
      users: [],
      roles: [
        { label: 'Admin', value: 'admin' },
        { label: 'Teacher', value: 'teacher' },
        { label: 'Student', value: 'student' }
      ]
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  async created () {
    const response = await getAll()
    if (response.error) {
      this.users = []
    } else {
      this.users = response
    }
  },
  methods: {
    getRoleLabel (role) {
      return this.roles.find(v => v.value === role).label
    },
    updateRecord (record) {
      update(record)
    },
    onRowSelect (event) {
      this.$emit('selected', event.data.id)
    },
    onRowUnselect (event) {
      this.$emit('unselected', event.data.id)
    }
  }
}
</script>
