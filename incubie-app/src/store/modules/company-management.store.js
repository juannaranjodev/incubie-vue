import feathersClient from '@/feathers-client'
import store from '@/store'

const companyManagement = feathersClient.service('companyManagement')

const state = {}

const getters = {}

const actions = {
  async isCompanyNameAvailable ({ commit }, { name, slug }) {
    try {
      await companyManagement.create({
        action: 'validateCompany',
        value: { name, slug }
      })
      return true
    } catch (err) {
      return false
    }
  },

  async inviteMembers ({ getters, commit }, members) {
    try {
      await companyManagement.create({
        action: 'inviteMembers',
        value: {
          members,
          company: store.getters['companies/current']
        }
      })
      return true
    } catch (err) {
      return false
    }
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
