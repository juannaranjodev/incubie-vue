const state = {}

const getters = {
  isAdmin: (state, getters, rootState) => (user, entity) => {
    const roleTypes = rootState.permissions.roleTypes
    const credentialRes = getters['find']({
      query: {
        user,
        entity,
        role: roleTypes.admin,
        $limit: 1
      }
    })

    return credentialRes.total > 0
  }
}

const actions = {}

const mutations = {}

export default {
  state,
  getters,
  actions,
  mutations
}
