<template>
  <div
    v-for="domain of domains"
    :key="domain.id"
    class="p-field-radiobutton"
  >
    <RadioButton
      :id="domain.id"
      v-model="selectedDomain"
      name="domain"
      :value="domain"
      @change="emitUpdate"
    />
    <label :for="domain.id">{{ domain.description }}</label>
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
      selectedDomain: null
    }
  },
  computed: {
    domains () {
      return this.$store.state.domains.all
    }
  },
  async created () {
    this.selectedDomain = this.domains[0]
    this.emitUpdate()
  },
  methods: {
    emitUpdate () {
      this.$emit('update:modelValue', this.selectedDomain)
    }
  }
}
</script>
