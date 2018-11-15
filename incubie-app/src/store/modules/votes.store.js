import actionTypes from '../action-types'
import { voteKinds } from '@/constants'
import { get } from 'lodash'

const state = {
  isVotePending: false
}

const getters = {
  hasVoted: (state, getters, rootState) => (userId, parent) => {
    userId = userId || get(rootState.auth.user, '_id')

    if (!parent.votes) {
      throw new Error('hasVoted: parent contains no votes.')
    }

    return !!parent.votes.find(vote => vote.voter === userId)
  }
}

const actions = {
  async create ({ commit, dispatch, rootGetters }, vote) {
    commit('setVotePending')

    const company = rootGetters['companies/current']
    const kind = vote.kind

    if (kind === voteKinds.ideas) {
      await dispatch('actions/dispatch', {
        type: actionTypes.IDEA_VOTE,
        payload: vote,
        entity: company._id
      }, { root: true })
    } else if (kind === voteKinds.comments) {
      await dispatch('actions/dispatch', {
        type: actionTypes.COMMENT_VOTE,
        payload: vote,
        entity: company._id
      }, { root: true })
    }

    commit('unsetVotePending')
  },

  async remove ({ commit, dispatch, rootGetters }, vote) {
    commit('setVotePending')

    const company = rootGetters['companies/current']
    const kind = vote.kind

    if (kind === voteKinds.ideas) {
      await dispatch('actions/dispatch', {
        type: actionTypes.REMOVE_IDEA_VOTE,
        entity: company._id,
        payload: vote
      }, { root: true })
    } else if (kind === voteKinds.comments) {
      await dispatch('actions/dispatch', {
        type: actionTypes.REMOVE_COMMENT_VOTE,
        entity: company._id,
        payload: vote
      }, { root: true })
    }

    commit('unsetVotePending')
  }
}

const mutations = {
  setVotePending (state) {
    state.isVotePending = true
  },
  unsetVotePending (state) {
    state.isVotePending = false
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
