import store from '@/store'
import errors from '@feathersjs/errors'
import { get } from 'lodash'

export default async function populateSlugGuard (to, from, next) {
  const user = get(store, 'state.auth.user')
  const companies = store.getters['companies/list']
  const company = store.getters['companies/get'](user.lastAccessed) || companies[0]

  if (company) {
    next({ name: 'feed/main', params: { slug: company.slug } })
  } else {
    // TODO: redirect to create company page
    next(new errors.NotFound({ errors: { company: 'User does not belong to any companies.' } }))
  }
}
