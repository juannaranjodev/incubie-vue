import store from '@/store'

export default {
  install (Vue, { feathersClient }) {
    feathersClient.service('actions').on('created', async res => {
      store.commit('notifiers/setNotifierPending')

      if (store.state.notifiers.errorOnNotify) {
        store.commit('notifiers/clearNotifierError')
      }

      if (res.notify) {
        try {
          await store.dispatch(`notifiers/${res.type}`, res.data, { root: true })
        } catch (err) {
          store.commit('notifiers/setNotifierError', err)
        }
      }

      store.commit('notifiers/unsetNotifierPending')
    })

    feathersClient.on('authenticated', data => {
      const { companies, roleTypes } = data

      store.commit('companies/addItems', companies)
      store.commit('permissions/setRoleTypes', roleTypes)
    })
  }
}
