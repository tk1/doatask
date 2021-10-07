<template>
  <h3>Domains</h3>
  <Button @click="createRecord">
    Create new domain
  </Button>
  <p>Edit name or description</p>
  <DataTable
    :value="domains"
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
    @cellEditComplete="onCellEditComplete"
  >
    <template #empty>
      No domains found.
    </template>

    <Column
      field="id"
      header="Id"
    />
    <Column
      field="name"
      header="Name"
    >
      <template #editor="slotProps">
        <InputText v-model="slotProps.data[slotProps.column.props.field]" />
      </template>
    </Column>
    <Column
      field="description"
      header="Description"
    >
      <template #editor="slotProps">
        <InputText v-model="slotProps.data[slotProps.column.props.field]" />
      </template>
    </Column>
  </DataTable>
</template>

<script>
export default {
  computed: {
    user () {
      return this.$store.state.user
    },
    domains () {
      return this.$store.state.domains.all
    }
  },
  methods: {
    onCellEditComplete (event) {
      this.$store.dispatch('domains/update', this.domains[event.index])
    },
    async createRecord () {
      const record = { name: 'name', description: 'description' }
      this.$store.dispatch('domains/save', record)
    }
  }
}
</script>
