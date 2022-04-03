import { ref } from 'vue'

const task = ref({
  disableButton: false,
  setDisableButton (value) {
    this.disableButton = value
  }
})

export default task
