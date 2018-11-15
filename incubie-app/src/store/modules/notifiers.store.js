import actionTypes from '@/store/action-types'
import serializeError from 'serialize-error'
import { get } from 'lodash'

const state = {
  isNotifierPending: false,
  errorOnNotify: undefined
}

const getters = {}

const actions = {
  [actionTypes.CREATE_BOARD] (store, data) {
    const { commit, rootState } = store
    const { board, user } = data

    const loggedInUserId = get(rootState, 'auth.user._id')

    if (user._id === loggedInUserId) {
      commit('auth/updateUser', user, { root: true })
    }

    commit('users/updateItem', user, { root: true })
    commit('boards/addItem', board, { root: true })
  },

  [actionTypes.INVITE_COMPANY_MEMBERS] (store, data) {
    // TODO: invite company members notifier
  },

  [actionTypes.CREATE_IDEA] (store, data) {
    const { commit } = store
    commit('ideas/addItem', data, { root: true })
  },

  [actionTypes.IDEA_VOTE] (store, data) {
    const { commit } = store
    const { parent, owner } = data

    commit('ideas/updateItem', parent, { root: true })
    commit('users/updateItem', owner, { root: true })
  },

  [actionTypes.REMOVE_IDEA_VOTE] (store, data) {
    const { commit } = store
    const { parent, owner } = data

    commit('ideas/updateItem', parent, { root: true })
    commit('users/updateItem', owner, { root: true })
  },

  [actionTypes.POST_COMMENT] (store, data) {
    const { commit, getters } = store

    commit('comments/addItem', data.comment, { root: true })
    commit('ideas/updateItem', data.idea, { root: true })
  },

  [actionTypes.COMMENT_VOTE] (store, data) {
    const { commit, getters } = store
    const { parent, owner, vote } = data
    const commentId = get(data, 'parent._id')

    commit('comments/removeItem', commentId, { root: true })
    commit('comments/addItem', parent, { root: true })
    commit('users/updateItem', owner, { root: true })
  },
  [actionTypes.REMOVE_COMMENT_VOTE] (store, data) {
    const { commit } = store
    const { parent, owner } = data
    const commentId = get(data, 'parent._id')

    commit('comments/removeItem', commentId, { root: true })
    commit('comments/addItem', parent, { root: true })
    commit('users/updateItem', owner, { root: true })
  },
  [actionTypes.EDIT_COMPANY_ROLES] (store, data) {
    const { commit, rootState } = store
    const { user } = data
    const loggedInUserId = get(rootState, 'auth.user._id')

    if (user._id === loggedInUserId) {
      commit('auth/updateUser', user, { root: true })
    }

    commit('users/updateItem', user, { root: true })
  },
  [actionTypes.JOIN_BOARD] (store, data) {
    const { user } = data
    const { commit } = store

    commit('users/updateItem', user, { root: true })
  },
  // ruby test <
  [actionTypes.HIDE_VOTE_COUNT] (store, data) {
    const { board } = data
    const { commit } = store
    commit('boards/updateItem', board, { root: true })
  }
  // ruby test >
}

const mutations = {
  setNotifierPending (state, val = true) {
    state.isNotifierPendingt = val
  },
  unsetNotifierPending (state) {
    state.isNotifierPending = false
  },
  setNotifierError (state, payload) {
    state.errorOnNotify = Object.assign({}, serializeError(payload))
  },
  clearNotifierError (state, payload) {
    state.errorOnNotify = null
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
