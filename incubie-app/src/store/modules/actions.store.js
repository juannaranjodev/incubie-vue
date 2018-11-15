import { get } from 'lodash'
import feathersClient from '@/feathers-client'
import serializeError from 'serialize-error'

const state = {
  isActionPending: false,
  errorOnAction: undefined
}

const getters = {}

const actions = {
  async dispatch ({ state, commit, dispatch, rootGetters, rootState }, { type, entity, payload }) {
    commit('setActionPending')

    if (state.errorOnAction) {
      commit('clearActionError')
    }

    try {
      const res = await feathersClient.service('actions').create({
        type,
        entity,
        payload,
        company: get(rootGetters['companies/current'], '_id')
      })

      commit('unsetActionPending')
      return res
    } catch (err) {
      commit('setActionError', err)
      commit('unsetActionPending')
    }
  }
}

const mutations = {
  setActionPending (state, val = true) {
    state.isActionPending = val
  },
  unsetActionPending (state) {
    state.isActionPending = false
  },
  setActionError (state, payload) {
    state.errorOnAction = Object.assign({}, serializeError(payload))
  },
  clearActionError (state) {
    state.errorOnAction = null
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
