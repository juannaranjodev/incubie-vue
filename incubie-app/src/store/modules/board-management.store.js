import feathersClient from '@/feathers-client'

const state = {
  errors: {}
}

const getters = {
  nameErrors: state => state.errors ? state.errors.name : undefined,
  hasErrors: state => !!Object.keys(state.errors).length
}

const actions = {
  async checkUnique ({ commit }, board) {
    if (!board) {
      return true
    }

    const boardService = feathersClient.service('boardManagement')
    commit('clearErrors')

    try {
      await boardService.create({
        action: 'checkUnique',
        value: board
      })
    } catch (err) {
      commit('setErrors', err.errors)
    }
  }
}

const mutations = {
  setErrors (state, errors) {
    state.errors = errors
  },
  clearErrors (state) {
    state.errors = {}
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
