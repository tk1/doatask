<template>
  <Toast />
  <Toolbar>
    <template #left>
      <img
        style="width: 100px;"
        src="./assets/logo.png"
      >
    </template>
    <template #right>
      <ToggleButton
        v-model="zenmode"
        onLabel="Zen on"
        offLabel="Zen off"
        onIcon="pi pi-check"
        offIcon="pi pi-times"
        style="width: 7em"
        @change="zenChanged"
      />
      <div>
        <Avatar
          icon="pi pi-user"
          class="p-mr-1"
          size="large"
        />
        {{ user.name }}
      </div>
    </template>
  </Toolbar>

  <TabMenu
    v-if="!storeZenMode"
    :model="accessibleItems"
  />
  <div class="router">
    <router-view />
  </div>
</template>

<script>
import { canUserAccess } from './auth/access.js'

export default {
  data () {
    return {
      items: [
        { label: 'Home', icon: 'pi pi-fw pi-home', to: '/' },
        { label: 'Tasks', icon: 'pi pi-fw pi-calendar', to: '/tasks' },
        { label: 'Assignments', icon: 'pi pi-fw pi-pencil', to: '/assignments' },
        { label: 'AssignmentTasks', icon: 'pi pi-fw pi-pencil', to: '/assignmenttasks' },
        { label: 'Solve', icon: 'pi pi-fw pi-pencil', to: '/assignmentsolve' },
        { label: 'Practice', icon: 'pi pi-fw pi-pencil', to: '/practice' },
        { label: 'Ratings', icon: 'pi pi-fw pi-pencil', to: '/ratings' },
        { label: 'Login', icon: 'pi pi-fw pi-cog', to: '/login' },
        { label: 'Admin', icon: 'pi pi-fw pi-cog', to: '/admin' }
      ],
      zenmode: false
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    },
    accessibleItems () {
      return this.items.filter(v => canUserAccess({ path: v.to }))
    },
    storeZenMode () {
      return this.$store.state.zenmode
    }
  },
  methods: {
    zenChanged () {
      this.$store.commit('setZenmode', this.zenmode)
    }
  }
}
</script>

<style scoped>
  .p-avatar {
    margin-left: 0.5ex;
  }
  .router {
    margin: 10px;
  }
</style>>
