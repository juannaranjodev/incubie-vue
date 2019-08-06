import feathersClient from '@/feathers-client'

const state = {
  permissions: null,
  roleTypes: null
}

const getters = {
  hasPermission: (state) => ({ action, role }) => {
    return true
  },
  canCloseIdea: (state, getters, rootState) => (idea, user) => {
    user = user || rootState.auth.user
    return idea.createdBy === user._id
  }
}

const actions = {
  async find ({ commit }, params) {
    const permissions = await feathersClient.service('permissions').find()
    commit('setPermissions', permissions)
  }
}

const mutations = {
  setPermissions (state, permissions) {
    state.permissions = permissions
  },
  unsetPermissions (state) {
    state.permissions = null
  },
  setRoleTypes (state, roleTypes) {
    state.roleTypes = roleTypes
  },
  unsetRoleType (state) {
    state.roleTypes = null
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
