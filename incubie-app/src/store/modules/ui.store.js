import { sortByTypes } from '@/constants'

const state = {
  isLoading: true,
  isMainMenuOpen: false,
  isMainMenuMini: false,

  isCreateBoardDialogOpen: false,
  isCreateIdeaDialogOpen: false,
  isInviteMembersDialogOpen: false,
  isInviteToBoardDialogOpen: false, // ruby test
  isBoardSlackSettingsOpen: false, // ruby test
  isIdeaCommentDialogOpen: false,

  isBoardInfoDrawerOpen: false,

  sortIdeasBy: sortByTypes.top.value,
  sortCommentsBy: sortByTypes.top.value
}

const getters = {
  sortByOptions: () => Object.keys(sortByTypes).map(sortByType => sortByTypes[sortByType])
}

const actions = {
  toggleMainMenu ({ state, commit }, val) {
    const newVal = !state.isMainMenuOpen
    console.log('newValue', newVal)
    commit('setMainMenuOpen', newVal)
  },
  toggleMainMenuMini ({ commit, state }, value) {
    if (state.isMainMenuMini) {
      commit('setMainMenuMini', false)
    } else {
      commit('setMainMenuMini', true)
    }
  }
}

const mutations = {
  setMainMenuOpen (state, value) {
    state.isMainMenuOpen = value
  },
  setMainMenuMini (state, value) {
    state.isMainMenuMini = value
  },
  setLoading (state, loading = true) {
    state.isLoading = loading
  },
  clearLoading (state) {
    state.isLoading = false
  },
  setCreateBoardDialogOpen (state, value = true) {
    state.isCreateBoardDialogOpen = value
  },
  setCreateIdeaDialogOpen (state, value = true) {
    state.isCreateIdeaDialogOpen = value
  },
  setInviteMembersDialogOpen (state, value = true) {
    state.isInviteMembersDialogOpen = value
  },
  // ruby test <
  setInviteToBoardDialogOpen (state, value = true) {
    state.isInviteToBoardDialogOpen = value
  },
  setBoardSlackSettingsOpen (state, value = true) {
    state.isBoardSlackSettingsOpen = value
  },
  // ruby test >
  setIdeaCommentDialogOpen (state, value = true) {
    state.isIdeaCommentDialogOpen = value
  },
  setSortIdeasBy (state, sortBy) {
    state.sortIdeasBy = sortBy
  },
  setSortCommentsBy (state, sortBy) {
    state.sortCommentsBy = sortBy
  },
  setBoardInfoDrawerOpen (state, value = true) {
    state.isBoardInfoDrawerOpen = value
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
