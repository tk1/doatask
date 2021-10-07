<template>
  <h1>Register LTI platform</h1>
  <div class="p-fluid p-grid p-formgrid">
    <div class="p-field p-col-12 p-md-3">
      <label for="name">Name</label>
      <InputText
        id="name"
        v-model="platform.name"
        type="text"
      />
    </div>
    <div class="p-field p-col-12 p-md-3">
      <label for="url">Url</label>
      <InputText
        id="url"
        v-model="platform.url"
        type="text"
      />
    </div>
    <div class="p-field p-col-12 p-md-3">
      <label for="clientid">Client Id</label>
      <InputText
        id="clientid"
        v-model="platform.clientId"
        type="text"
      />
    </div>
    <Button @click="registerPlatform">
      Register platform
    </Button>
    <Toast />
  </div>
</template>

<script>
import { post } from '../services/ApiService.js'

export default {
  data () {
    return {
      platform: {
        name: '',
        url: 'https://',
        clientId: ''
      },
      message: {
        text: '',
        visible: false,
        severity: 'error'
      }
    }
  },
  methods: {
    async registerPlatform () {
      if (!this.platform.name || !this.platform.url || !this.platform.clientId) {
        this.$toast.add({
          severity: 'error',
          summary: 'Missing data',
          detail: 'Fill in all fields',
          life: 5000
        })
        return
      }
      const result = await post('ltiadmin/platform', this.platform)
      if (result.error) {
        result.status = result.error.response.statusText
      }
      this.$toast.add({
        severity: result.status === 'ok' ? 'success' : 'error',
        summary: 'Server message',
        detail: result.status,
        life: 5000
      })
    }
  }
}
</script>
