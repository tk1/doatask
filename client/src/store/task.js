import { ref } from 'vue'

export const saveButton = ref({
  disableButton: false,
  setDisableButton (value) {
    this.disableButton = value
  }
})
