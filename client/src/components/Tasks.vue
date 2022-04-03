<template>
  <div class="p-component">
    <h1>
      Manage Tasks
    </h1>
    <Button @click="showCreateDialog">
      Create task
    </Button>

    <Dialog
      v-model:visible="createDialogVisible"
      :style="{width: '900px'}"
      header="Create task"
      :modal="true"
      :maximizable="true"
      class="p-fluid"
    >
      <Dropdown
        v-model="currentPlugin"
        :options="plugins"
        option-label="name"
        placeholder="Select a plugin"
        @change="pluginChanged"
      />
      <TaskEdit
        v-if="record.plugin"
        v-model="record"
      />
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
          :disabled="disableSaveButton()"
          @click="save"
        />
      </template>
    </Dialog>
    <TasksList />
  </div>
</template>

<script>
import TasksList from './TasksList.vue'
import TaskEdit from './TaskEdit.vue'
import task from '../store/task.js'

export default {
  components: {
    TasksList,
    TaskEdit
  },
  data () {
    return {
      currentPlugin: {},
      createDialogVisible: false,
      record: {
        details: {
          private: {}
        }
      }
    }
  },
  computed: {
    tasks () {
      return this.$store.state.tasks
    },
    plugins () {
      return this.$store.state.plugins.map(p => ({
        name: p.name,
        component: p.name + 'Edit'
      }))
    },
    pluginName () {
      return this.currentPlugin.name
    }
  },
  methods: {
    showCreateDialog () {
      this.createDialogVisible = true
    },
    hideCreateDialog () {
      this.createDialogVisible = false
    },
    pluginChanged (event) {
      this.record.plugin = event.value.name
    },
    async save () {
      await this.$store.dispatch('saveTask', this.record)
      this.hideCreateDialog()
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
</style>
