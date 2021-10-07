import { createStore } from 'vuex'
import router from '../router.js'
import { login, register, ltilogin, getProfile } from '../services/AuthService'
import { getAll, getAllForUser, getAllForStudent, save, update, remove } from '../services/TaskService'
import { setToken as setApiToken } from '../services/ApiService'

import moduleAssignment from './assignment'
import moduleDomain from './domain'

// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode'
const noUser = {
  id: -1,
  name: 'noUser'
}

const store = createStore({
  modules: {
    assignments: moduleAssignment,
    domains: moduleDomain
  },
  state () {
    return {
      tasks: [],
      accessToken: 'initial',
      user: noUser,
      plugins: [],
      submissions: [],
      zenmode: false,
      taskInProgress: false
    }
  },
  mutations: {
    increment (state) {
      state.count++
    },
    setTasks (state, payload) {
      state.tasks = payload
    },
    addTask (state, payload) {
      state.tasks.push(payload)
    },
    updateTask (state, payload) {
      const index = this.getters.getTaskIndexById(payload.id)
      state.tasks[index] = payload
    },
    deleteTask (state, payload) {
      const index = this.getters.getTaskIndexById(payload.id)
      state.tasks.splice(index, 1)
    },
    setToken (state, payload) {
      state.accessToken = payload.token
      state.user = payload.user
      setApiToken(payload.token)
    },
    logout (state) {
      state.accessToken = ''
      state.user = noUser
      setApiToken(null)
    },
    setZenmode (state, payload) {
      state.zenmode = payload
    },
    setProperty (state, payload) {
      if (payload.propName) {
        state[payload.propName] = payload.value
      }
    }
  },
  getters: {
    getTaskIndexById: (state) => (id) => {
      return state.tasks.findIndex(t => t.id === id)
    }
  },
  actions: {
    async getAllTasks ({ commit }) {
      const tasks = await getAll()
      commit('setTasks', tasks)
    },
    async saveTask ({ commit, state }, task) {
      task.owner = state.user.id
      const savedTask = await save(task)
      commit('addTask', savedTask)
      return savedTask
    },
    async updateTask ({ commit }, task) {
      const updatedTask = await update(task)
      commit('updateTask', updatedTask)
    },
    async deleteTask ({ commit }, task) {
      await remove(task)
      commit('deleteTask', task)
    },
    async loadTasks ({ commit, dispatch }, user) {
      dispatch('domains/getAll')
      if (user.role === 'student') {
        commit('setTasks', await getAllForStudent(user.id))
        dispatch('assignments/getAll')
      } else {
        const tasks = await getAllForUser(user.id)
        commit('setTasks', tasks)
        dispatch('assignments/getAllForUser', user.id)
      }
    },
    async login ({ commit, dispatch }, credentials) {
      let result
      // if login via moodle then credentials.course contains info on the current course
      credentials.username = credentials.name
      if (credentials.ltik) {
        result = await ltilogin(credentials)
      } else {
        result = await login(credentials)
      }
      if (result.error) {
        commit('setToken', { token: null, user: { ...noUser, error: result.error.response.statusText } })
      } else {
        const payload = jwt_decode(result.access_token)
        commit('setToken', {
          token: result.access_token,
          user: payload.user
        })
        dispatch('loadTasks', payload.user)
        if (credentials.toUrl && credentials.toUrl !== '/') {
          router.push({ path: credentials.toUrl, query: { zen: true } })
        } else {
          router.push('/')
        }
      }
    },
    async register ({ commit, dispatch }, credentials) {
      credentials.role = 'student'
      credentials.origin = 'local'

      const result = await register(credentials)
      if (result.error) {
        commit('setToken', { token: null, user: { ...noUser, error: result.error } })
      } else {
        dispatch('login', credentials)
      }
    },
    async getProfile ({ commit }) {
      await getProfile()
    }
  }
})

export default store
