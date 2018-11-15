import { get } from 'lodash'
import actionTypes from '@/store/action-types'

const state = {}

const getters = {
  getIdBySlug: (state, getters, rootState, rootGetters) => slug => {
    const companiesRes = getters['find']({
      query: {
        slug
      }
    })

    return get(companiesRes, 'data[0]._id')
  },
  allowedIdeasCount: () => 100,
  allowedMembersCount: () => 10
}

const actions = {
  async loadCompanyBySlug ({ commit, dispatch, getters }, slug) {
    const id = getters['getIdBySlug'](slug)

    if (id) {
      await dispatch('load', id)
    } else {
      throw new Error('Invalid slug.')
    }
  },

  async load ({ commit, getters, dispatch }, id) {
    commit('ui/setLoading', true, { root: true })
    commit('setCurrent', id)

    const { data } = await dispatch('actions/dispatch', {
      type: actionTypes.LOAD_COMPANY,
      entity: id,
      payload: {
        id
      }
    }, { root: true })

    await dispatch('clearCompanyData', data)
    await dispatch('initCompanyData', data)

    commit('ui/clearLoading', null, { root: true })
  },

  async clearCompanyData ({ commit }) {
    commit('users/clearAll', null, { root: true })
    commit('boards/clearAll', null, { root: true })
    commit('ideas/clearAll', null, { root: true })
  },

  async initCompanyData ({ commit, dispatch }, { company, boards, ideas, users }) {
    commit('users/addItems', users, { root: true })
    commit('boards/addItems', boards, { root: true })
  }
}

const mutations = {}

export default {
  state,
  getters,
  actions,
  mutations
}