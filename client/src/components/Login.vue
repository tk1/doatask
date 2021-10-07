<template>
  <div>
    <Dialog
      v-model:visible="displayModal"
      :header="header"
      :style="{width: '50vw'}"
      :modal="true"
    >
      <div class="p-fluid p-grid p-formgrid">
        <div class="p-field p-col-12">
          <label for="username">Username</label>
          <InputText
            id="username"
            v-model="credentials.name"
            type="text"
          />
        </div>
        <div
          v-if="mode === 'register'"
          class="p-field p-col-12"
        >
          <label for="email">Email</label>
          <InputText
            id="email"
            v-model="credentials.email"
            type="email"
          />
        </div>
        <div class="p-field p-col-12">
          <label for="pw">Password</label>
          <Password
            id="pw"
            v-model="credentials.password"
            :feedback="false"
          />
        </div>
      </div>
      <template #footer>
        <Button
          label="Cancel"
          icon="pi pi-times"
          class="p-button-text"
          @click="closeModal"
        />
        <Button
          :disabled="!filled"
          @click="submit"
        >
          {{ header }}
        </Button>
      </template>
    </Dialog>
  </div>
  <Button @click="openLogin">
    Login
  </Button>
  <Button @click="openRegister">
    Register
  </Button>
  <Button @click="logout">
    Logout
  </Button>
</template>

<script>

export default {
  data () {
    return {
      displayModal: false,
      mode: null,
      credentials: {
        name: null,
        password: null,
        email: null
      }
    }
  },
  computed: {
    filled () {
      return this.credentials.name && this.credentials.password &&
        (this.mode === 'login' || this.credentials.email)
    },
    header () {
      return this.mode === 'login' ? 'Login' : 'Register'
    }
  },
  mounted () {
    this.$store.watch(state => state.user, this.userChanged)
  },

  methods: {
    submit () {
      this.$store.dispatch(this.mode, this.credentials)
    },
    logout () {
      this.mode = 'logout'
      this.$store.commit('logout')
    },
    openLogin () {
      this.displayModal = true
      this.mode = 'login'
    },
    openRegister () {
      this.displayModal = true
      this.mode = 'register'
    },
    closeModal () {
      this.displayModal = false
    },
    userChanged: function (newValue) {
      this.closeModal()
      if (this.$store.state.user.id >= 0) {
        this.$toast.add({
          severity: 'success',
          summary: 'Login successful',
          detail: `Logged in as user ${newValue.name}`,
          life: 3000
        })
      } else {
        if (this.mode === 'logout') {
          this.$toast.add({
            severity: 'success',
            summary: 'Logout successful',
            life: 3000
          })
        } else {
          this.$toast.add({
            severity: 'error',
            summary: `${this.mode} failed`,
            detail: newValue.error || 'not logged in',
            life: 3000
          })
        }
      }
    }
  }
}
</script>

<style scoped>
span {
  margin: 5px;
}
</style>
