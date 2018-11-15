const state = {
  timeout: 5000,
  message: null,
  isSnackbarVisible: false,
  color: 'success'
}

const getters = {}

const actions = {}

const mutations = {
  show (state, { color, message }) {
    state.color = color || 'success'
    state.message = message
    state.isSnackbarVisible = true
  },
  dismiss (state) {
    state.message = null
    state.isSnackbarVisible = false
  },
  setColor (state, color) {
    state.color = color
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
