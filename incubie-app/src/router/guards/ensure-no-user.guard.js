import store from '@/store'

export default async (to, from, next) => {
  const user = store.state.auth.user

  if (user) {
    next({ name: 'root' })
  } else {
    try {
      await store.dispatch('auth/authenticate')
      next({ name: 'root' })
    } catch (err) {
      await store.dispatch('auth/logout')
      next()
    }
  }
}
