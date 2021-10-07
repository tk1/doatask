import { getAll, save, update, remove } from '../services/DomainService'

function getIndexById (state, id) {
  return state.all.findIndex(v => v.id === id)
}

const moduleDomain = {
  namespaced: true,
  state () {
    return {
      all: [],
      changedRecord: { name: 'x' }
    }
  },
  mutations: {
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
    }
  },
  getters: {
    get: (state) => (id) => {
      return state.all.find(t => t.id === id)
    }
  },
  actions: {
    async getAll ({ commit }) {
      const all = await getAll()
      all.sort((a, b) => a.id - b.id)
      commit('setAll', all)
    },
    async deleteOne ({ commit }, record) {
      await remove(record)
      commit('deleteOne', record)
    },
    async update ({ commit }, record) {
      const updatedRecord = await update(record)
      commit('update', updatedRecord)
    },
    async save ({ commit }, record) {
      const savedRecord = await save(record)
      commit('add', savedRecord)
      return savedRecord
    }
  }
}

export default moduleDomain
