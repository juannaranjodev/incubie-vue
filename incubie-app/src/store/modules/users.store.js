import { roleTypes } from '@/constants'
import { get } from 'lodash'
import actionTypes from '../action-types'

const state = {}

const getters = {
  fullName: (state) => (user) => `${user.firstName} ${user.lastName || ''}`,
  isAdmin: (state, getters, rootState) => (user, entity) => {
    const credentials = get(user, 'credentials', [])
    return credentials.find(credential => credential.entity === entity && credential.role === roleTypes.admin)
  },
  role: (state, getters) => (user, entity) => {
    const credentials = get(user, 'credentials', [])
    const credential = credentials.find(credential => credential.entity === entity)
    return get(credential, 'role')
  },
  hasCredential: (state) => (user, entity) => {
    const credentials = get(user, 'credentials', [])
    return credentials.find(credential => credential.entity === entity)
  }
}

const actions = {
  async load ({ commit, dispatch }, id) {
    await commit('setCurrent', id)
    await dispatch('ideas/findBySort', { createdBy: id }, { root: true })
  },

  async unload ({ commit }) {
    await commit('clearCurrent')
  },

  async search({dispatch}, kw) {
    return dispatch("find", {
      query: {
        $or: [
          {"lastName": {$search: kw || ""}},
          {"firstName": {$search: kw || ""}},
          {"email": {$search: kw || ""}}
        ]
      }
    });
  },

  async updateUserToken({dispatch, getters}, {userId, token}) {
    let user = getters.get(userId);

    console.log("updateUserToken", user);

    let tokens = user.notificationsTokens || [],
        bool = true;

    for(let i in tokens) {
      if(tokens[i] == token) {
        bool = false;
      }
    }

    if(bool) {
      tokens.push(token);

      let mutableUser = {
        "notificationsTokens": tokens
      };

      dispatch("patch", [user._id, mutableUser]);
    }
  },

  editCompanyRole ({ dispatch, rootGetters }, data) {
    const company = rootGetters['companies/current']

    return dispatch('actions/dispatch', {
      type: actionTypes.EDIT_COMPANY_ROLES,
      payload: data,
      entity: company._id
    }, { root: true })
  }
}

const mutations = {}

export default {
  state,
  getters,
  actions,
  mutations
}
