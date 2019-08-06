import { get } from 'lodash'

const state = {
  userService: 'users'
}

const getters = {
  roles: state => {
    return [
      { text: 'Admin', value: 'admin' },
      { text: 'Member', value: 'member' }
    ]
  },
  loggedInUser: (state, getters, rootState, rootGetters) => {
    const userId = get(state, 'payload.userId')

    return rootGetters['users/get'](userId);
  },
  loggedInUserCompany: (state, getters, rootState, rootGetters) => {
    const user = getters.loggedInUser;

    return user ? rootGetters['companies/get'](user.lastAccessed) : {};
  },
  allUsers: (state, getters, rootState, rootGetters) => {
    return rootGetters['users/find']()
  }
}

const actions = {
  clearAll ({ commit }) {
    commit('boards/clearAll', null, { root: true })
    commit('companies/clearAll', null, { root: true })
    commit('users/clearAll', null, { root: true })
  }
}

const mutations = {
  updateUser (state, user) {
    state.user = user
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
