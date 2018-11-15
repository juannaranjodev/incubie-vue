import { paramsForServer } from 'feathers-hooks-common'
import { sortByTypes } from '@/constants'
import { clone, get, map } from 'lodash'

const state = {
  pageSize: 10,
  repliesSize: 5,
  page: 1,
  paginate: {
    default: 500,
    max: 500
  },
  frozen: []
}

const getters = {
  roots: (state, getters) => {
    return getters['list'].filter(comment => {
      return comment.parent === null
    }).sort(getters['sortFn'])
  },
  children: (state, getters) => (parent) => {
    return getters['list'].filter(comment => {
      return comment.parent === parent
    }).sort(getters['sortFn'])
  },
  frozenRoots: (state, getters) => state.frozen.filter(comment => comment.parent === null).sort(getters['sortFn']),
  frozenChildren: (state, getters) => (parent) => state.frozen.filter(comment => comment.parent === parent._id).sort(getters['sortFn']),
  sortFn: (state, getters, rootState) => {
    const sortBy = rootState.ui.sortCommentsBy
    let sortFn = (a, b) => a - b

    if (sortBy === sortByTypes.top.value) {
      sortFn = (a, b) => {
        if (a.voteCount > b.voteCount) {
          return -1
        } else if (a.voteCount < b.voteCount) {
          return 1
        }
        return 0
      }
    } else if (sortBy === sortByTypes.new.value) {
      sortFn = (a, b) => {
        if (a.createdAt > b.createdAt) {
          return -1
        } else if (a.createdAt < b.createdAt) {
          return 1
        }
        return 0
      }
    }

    return sortFn
  },
  sortParams: (state, getters, rootState) => {
    const sortBy = rootState.ui.sortCommentsBy
    const sortParams = {}

    if (sortBy === sortByTypes.top.value) {
      sortParams.voteCount = -1
      sortParams.createdAt = -1
    } else if (sortBy === sortByTypes.new.value) {
      sortParams.createdAt = -1
    }

    return sortParams
  },
  skip: (state) => (state.page - 1) * state.pageSize,
  hasMore: (state, getters) => {
    const pagination = get(state, 'pagination.roots')

    if (pagination) {
      const { limit, skip, total } = pagination
      return (limit + skip) < total
    } else {
      return false
    }
  },
  isAuthor: (state, getters) => (commentId, userId) => {
    const comment = getters['get'](commentId)

    return comment.createdBy === userId
  }
};

const actions = {
  async load ({ commit, dispatch, rootGetters }, idea) {
    idea = rootGetters['ideas/current'];
    await commit('clearList');
    await commit('clearFrozenList');
    await commit('resetPage');

    await dispatch('findNextPage', idea)
  },
  async findNextPage ({ commit, dispatch, getters, rootGetters, state, rootState }, idea) {
    idea = idea || rootGetters['ideas/current']
    const commentsRes = await dispatch('find', {
      query: {
        idea: idea._id,
        parent: null,
        $limit: state.pageSize,
        $skip: getters['skip'],
        $sort: getters['sortParams']
      },
      qid: 'roots'
    })

    const repliesRes = await dispatch('findAllReplies', commentsRes.data)

    commit('incrementPage')

    return commentsRes.data.concat(repliesRes.data)
  },

  async search({dispatch}, params) {
      if(typeof params == "string") {
          params = {
              "kw": params
          };
      }

      let kw = {};

      if(params.kw) {
          kw.$search = params.kw || "";

          delete params.kw;
      }


      return dispatch('find', {
          query: {text: kw, ...params}
      });
  },

  async findAllReplies ({ dispatch }, parents) {
    return dispatch('find', {
      query: {
        allReplies: true,
        parent: {
          $in: parents.map(comment => comment._id)
        },
        $sort: getters['sortParams'],
        $limit: 1000
      },
      qid: 'replies'
    })
  }
};

const mutations = {
  incrementPage (state) {
    state.page = state.page + 1
  },
  resetPage (state) {
    state.page = 1
  },
  clearFrozenList (state) {
    state.frozen = []
  },
  addFrozenItems (state, items) {
    const frozenComments = state.frozen

    items.forEach(item => {
      const found = frozenComments.find(frozenComment => frozenComment._id === item._id)
      !found && state.frozen.push(item)
    })
  }
};

const instanceDefaults = {
  createdBy: '',
  idea: '',
  parent: null, 
  text: ''

};

export default {
  state,
  getters,
  actions,
  mutations,
  instanceDefaults
}
