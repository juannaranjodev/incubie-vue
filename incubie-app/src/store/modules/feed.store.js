const state = {}

const getters = {}

const actions = {
  async load ({ commit, dispatch }) {
    await commit('ideas/clearList', {}, { root: true })
    await dispatch('ideas/findBySort', {}, { root: true })
  },
  async unload ({ commit, dispatch }) {
    await commit('ideas/clearList', {}, { root: true })
  }
}

const mutations = {}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
