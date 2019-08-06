import store from '@/store'

export default async function ensureCompanyAdmin (to, from, next) {
  const user = store.state.auth.user
  const company = store.getters['companies/current']
  const isAdmin = store.getters['users/isAdmin'](user, company._id)

  if (isAdmin) {
    next()
  } else {
    next({ name: 'unauthorized/company' })
  }
}
