// DEPRECATED
import { get } from 'lodash'
import store from '@/store'

export default async function ensureCompanyGuard (to, from, next) {
  const slug = get(to, 'params.slug')
  const userId = get(store, 'state.auth.user._id')
  const authorizedCompany = get(store, 'state.auth.payload.companyId')
  const requestedCompany = store.getters['companies/getIdBySlug'](slug)
  const currentCompany = get(store.getters['companies/current'], '_id')

  if (authorizedCompany === requestedCompany) {
    if (currentCompany === requestedCompany) {
      next()
    } else {
      try {
        await store.dispatch('companies/load', requestedCompany)
        next()
      } catch (err) {
        next({ name: 'notFound' })
      }
    }
  } else {
    // TODO: ensure user is member of company before redirecting to login page else redirect to unauthorized
    next({ name: 'login', params: { slug, userId } })
  }
}
