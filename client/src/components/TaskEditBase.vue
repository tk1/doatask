<template>
  <div class="main">
    <slot name="header">
      <h1>Edit</h1>
    </slot>
    <div class="p-fluid p-grid p-formgrid">
      <div class="p-field p-col-12 p-md-3">
        <label for="domain">Domain</label>
        <Dropdown
          id="domain"
          v-model="currentDomain"
          :options="domains"
          option-label="name"
          placeholder="Select a domain"
          @change="domainChanged"
        />
      </div>
      <div class="p-field p-col-12 p-md-3">
        <label for="title">Title</label>
        <InputText
          id="title"
          v-model="task.title"
          type="text"
          @input="changed"
        />
      </div>
      <div class="p-field p-col-12 p-md-3">
        <label for="tags">Tags</label>
        <Chips
          id="tags"
          v-model="task.tags"
          type="text"
          @input="changed"
        />
      </div>
      <div class="p-field-checkbox p-col-4 p-md-1">
        <Checkbox
          id="public"
          v-model="task.public"
          :binary="true"
        />
        <label for="public">public</label>
      </div>
      <div class="p-field-checkbox p-col-4 p-md-1 p-ml-3">
        <Checkbox
          id="savable"
          v-model="task.savable"
          :binary="true"
        />
        <label for="public">savable</label>
      </div>
      <div class="p-field-checkbox p-col-4 p-md-1 p-ml-3">
        <Checkbox
          id="isActive"
          v-model="task.isActive"
          :binary="true"
        />
        <label for="public">active</label>
      </div>
      <slot name="description">
        <Splitter class="p-col-12">
          <SplitterPanel :size="60">
            <div class="p-field">
              <label for="description">Description</label>
              <Textarea
                id="description"
                v-model="task.description"
                :autoResize="true"
                rows="4"
                type="text"
                @input="changed"
              />
            </div>
          </SplitterPanel>
          <SplitterPanel>
            <MarkDown :source="task.description || ' '" />
          </SplitterPanel>
        </Splitter>
      </slot>
    </div>
    <slot name="details">
      <p>Plugin {{ task.plugin }} specific details: {{ task.details }}</p>
    </slot>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: Object,
      required: true
    }
  },
  emits: ['update:modelValue'],
  data () {
    return {
      task: {
        details: {}
      },
      currentDomain: null
    }
  },
  computed: {
    domains () {
      return this.$store.state.domains.all
    }
  },
  created () {
    this.task = this.modelValue
    this.currentDomain = this.task.domain
  },
  methods: {
    changed (event) {
      this.$emit('update:modelValue', this.task)
    },
    domainChanged (event) {
      this.task.domain = event.value
      this.$emit('update:modelValue', this.task)
    }
  }
}
</script>

<style scoped>
.main {
  margin: 0px;
}
</style>
