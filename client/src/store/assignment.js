import { getAll, getAllForUser, save, update, remove } from '../services/AssignmentService'
import * as atService from '../services/AssignmentTaskService'

function getIndexById (state, id) {
  return state.all.findIndex(v => v.id === id)
}

const moduleAssignment = {
  namespaced: true,
  state () {
    return {
      all: [],
      changedRecord: { name: 'x' },
      isLoading: false
    }
  },
  mutations: {
    setLoading (state, payload) {
      state.isLoading = payload
    },
    setAll (state, payload) {
      state.all = payload
    },
    deleteOne (state, payload) {
      const index = getIndexById(state, payload.id)
      state.all.splice(index, 1)
    },
    update (state, payload) {
      const index = getIndexById(state, payload.id)
      state.all[index] = payload
      state.changedRecord = payload
    },
    add (state, payload) {
      state.all.push(payload)
      state.changedRecord = payload
    },
    addTask (state, payload) {
      const index = getIndexById(state, payload.assignmentId)
      state.all[index].assignmentTasks.push(payload)
    },
    removeTask (state, payload) {
      const index = getIndexById(state, payload.assignmentId)
      const indexTask = state.all[index].assignmentTasks.findIndex(v => v.taskId === payload.taskId)
      state.all[index].assignmentTasks.splice(indexTask, 1)
    },
    updateTask (state, payload) {
      const index = getIndexById(state, payload.assignmentId)
      const indexTask = state.all[index].assignmentTasks.findIndex(v => v.taskId === payload.taskId)
      state.all[index].assignmentTasks[indexTask] = payload
    }
  },
  getters: {
    get: (state) => (id) => {
      return state.all.find(t => t.id === id)
    }
  },
  actions: {
    async getAll ({ commit }) {
      commit('setLoading', true)
      const all = await getAll()
      commit('setAll', all)
      commit('setLoading', false)
    },
    async getAllForUser ({ commit }, id) {
      commit('setLoading', true)
      const all = await getAllForUser(id)
      commit('setAll', all)
      commit('setLoading', false)
    },
    async deleteOne ({ commit }, record) {
      await remove(record)
      commit('deleteOne', record)
    },
    async update ({ commit }, record) {
      const updatedRecord = await update(record)
      commit('update', updatedRecord)
    },
    async save ({ commit, state, rootState }, record) {
      record.owner = rootState.user.id
      const savedRecord = await save(record)
      commit('add', savedRecord)
      return savedRecord
    },
    async addTask ({ commit }, record) {
      const savedRecord = await atService.save(record)
      commit('addTask', savedRecord)
    },
    async removeTask ({ commit }, record) {
      await atService.remove(record.id)
      commit('removeTask', record)
    },
    async updateTask ({ commit }, record) {
      await atService.update(record)
      commit('updateTask', record)
    }
  }
}

export default moduleAssignment
