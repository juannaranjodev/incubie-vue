import feathersClient from '@/feathers-client'

const state = {}

const getters = {}

const actions = {
  async create (store, dataUri) {
    const res = await feathersClient.service('uploads').create({ uri: dataUri })

    return res.id
  }
}

const mutations = {}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
