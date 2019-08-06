import { get } from 'lodash'
import actionTypes from '../action-types'
import { entityTypes, roleTypes } from '@/constants'

const state = {}

const getters = {
  currentId: (state, getters) => get(getters['current'], '_id'),
  getIdBySlug: (state, getters, rootState, rootGetters) => slug => {
    const boardsRes = getters['find']({
      query: {
        slug
      }
    })

    return get(boardsRes, 'data[0]._id')
  },
  byUser: (state, getters) => (user) => {
    const boardIds = user.credentials
      .filter(credential => credential.kind === entityTypes.boards)
      .map(credential => credential.entity)

    const boardsRes = getters['find']({
      query: {
        _id: {
          $in: boardIds
        }
      }
    })

    return get(boardsRes, 'data')
  },
  byNotUser: (state, getters) => (user) => {
    const boardIds = user.credentials
      .filter(credential => credential.kind === entityTypes.boards)
      .map(credential => credential.entity)

    const boardsRes = getters['find']({
      query: {
        _id: {
          $nin: boardIds
        }
      }
    })

    return get(boardsRes, 'data')
  },
  hasUser: (state, getters) => (boardId, user) => {
    const credentials = get(user, 'credentials', [])
    console.log('hasUser', credentials)
    return credentials.find(credential => credential.entity === boardId)
  },
  getUsers: (state, getters, rootState, rootGetters) => (boardId) => {
    const users = rootGetters['users/list'];

    return users.filter(user => {
      return user.credentials.find(credential => {
        user.role = credential.role
        return credential.entity === boardId
      })
    })
  },
  // ruby test <
  shareLink: (state, getters) => {
    return window.location.href
  },
  // ruby test >
}

const actions = {
  async load ({ commit, dispatch, getters }, id) {
    const board = get(getters['current'], '', {});

    await commit('setCurrent', id)
    return dispatch('ideas/findBySort', { board: id }, { root: true })
  },
  async unload ({ commit }) {
    commit('clearCurrent')
  },
  setCurrentBySlug ({ commit, getters }, slug) {
    const boardId = get(getters['find']({
      query: {
        slug,
        $limit: 1
      }
    }), 'data[0]._id', {})

    commit('setCurrent', boardId)
  },
  async join ({ commit, dispatch, getters, rootGetters, rootState }, board) {
    const company = get(rootGetters['companies/current'], '_id')
    const user = get(rootState, 'auth.user._id')
    board = board || get(getters['current'], '_id')

    const res = await dispatch('actions/dispatch', {
      type: actionTypes.JOIN_BOARD,
      payload: {
        board,
        user,
        company
      },
      entity: company
    }, { root: true });

    const updatedUser = get(res, 'data.user');
    await commit('users/updateItem', updatedUser, { root: true });
    await commit('auth/updateUser', updatedUser, { root: true });
  },
  async search({dispatch}, kw) {
    return dispatch("find", {
      query: {
        "name": {
          $search: kw || ""
        }
      }
    });
  }
};

const mutations = {};


export default {
  state,
  getters,
  actions,
  mutations
};