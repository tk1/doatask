<template>
  <div class="p-component">
    <template v-if="!$production">
      <Button
        v-for="testUser in testUsersWithAdmin"
        :key="testUser.name"
        @click="logintest(testUser.name)"
      >
        Login {{ testUser.name }}
      </Button>
      <Button
        v-if="isAdmin"
        @click="createTestUsers"
      >
        Create test users
      </Button>
    </template>
    <DomainsList />
    <UsersList v-if="isAdmin" />
    <RegisterPlatform v-if="isAdmin" />
  </div>
</template>

<script>
import UsersList from './UsersList.vue'
import DomainsList from './DomainsLists.vue'
import RegisterPlatform from './RegisterPlatform.vue'
import { save } from '../services/UserService.js'

export default {
  components: {
    UsersList,
    DomainsList,
    RegisterPlatform
  },
  data () {
    return {
      mode: null,
      credentials: {
        name: null,
        password: null,
        email: null
      },
      testUsersCount: 3
    }
  },
  computed: {
    testUsers () {
      const list = []
      const roles = ['student', 'teacher']
      for (const role of roles) {
        for (let i = 1; i <= this.testUsersCount; i++) {
          const name = `${role}${i}`
          list.push({ name, role })
        }
      }
      return list
    },
    testUsersWithAdmin () {
      const list = this.testUsers
      list.unshift({ name: 'admin', role: 'admin' })
      return list
    },
    isAdmin () {
      return this.user.role === 'admin'
    },
    user () {
      return this.$store.state.user
    }
  },
  mounted () {
    this.$store.watch(state => state.user, this.userChanged)
  },

  methods: {
    logintest (username) {
      this.mode = 'login'
      this.$store.dispatch('login', {
        name: username,
        password: username
      })
    },

    createTestUsers () {
      for (const user of this.testUsers) {
        const testUser = {
          name: user.name,
          password: user.name,
          email: `${user.name}@htwsaar.de`,
          role: user.role,
          origin: 'local'
        }
        save(testUser)
      }
    },
    userChanged: function (newValue) {
      if (this.$store.state.user.id >= 0) {
        this.$toast.add({
          severity: 'success',
          summary: 'Login successful',
          detail: `Logged in as user ${newValue.name}`,
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
</script>

<style scoped>
span {
  margin: 5px;
}
</style>
