// import ensureNoUser from '../guards/ensure-no-user.guard'

export const signUpRoute = {
  path: '/signup',
  component: () => import('@/views/auth/Auth'),
  children: [
    {
      path: '',
      name: 'signup',
      component: () => import('@/views/auth/SignUp')
    }
  ]
}

export const logInRoutes = {
  path: '/login',
  component: () => import('@/views/auth/Auth'),
  children: [
    {
      path: ':slug?/:userId?',
      name: 'login',
      component: () => import('@/views/auth/Login'),
      props: true
    }
  ]
}

export const logOutRoute = {
  path: '/logout',
  name: 'logout',
  component: () => import('@/views/auth/Logout')
}

export const verifyEmailRoute = {
  path: '/account/verify/:token',
  component: () => import('@/views/account/VerifyEmail'),
  props: true
}
