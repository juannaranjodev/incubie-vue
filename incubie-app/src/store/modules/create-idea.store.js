const state = {
  images: []
}

const getters = {}

const actions = {}

const mutations = {
  addImage (state, file) {
    state.images.push({
      name: file.name,
      loaded: false
    })
  },
  addImageData (state, { index, data }) {
    state.images[index].data = data
    state.images[index].loaded = true
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
