import store from '@/store'
import { get } from 'lodash'

export default async function ensureUserGuard (to, from, next) {
  // const user = store.state.auth.user
  const accessToken = get(store.state, 'auth.accessToken');

  // console.log(accessToken);

  if (accessToken) {
    next();
  } else {
    try {
      await store.dispatch('auth/authenticate');
      next();
    } catch (err) {
      next({
        name: 'login',
        query: {
          redirect: to.fullPath
        }
      });
    }
  }
}
