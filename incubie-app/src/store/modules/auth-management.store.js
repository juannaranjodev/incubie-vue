import { authManagement } from '@/feathers-client'

const state = {}

const getters = {}

const actions = {
  async checkUniqueEmail ({ commit }, email) {
    try {
      await authManagement.checkUnique({ email })
      return true
    } catch (err) {
      return false
    }
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
