export const accountRoutes = {
  path: 'account',
  components: {
    default: () => import('@/views/account/Account'),
    toolbar: () => import('@/views/account/AccountToolbar')
  },
  children: [
    {
      path: '',
      name: 'account/profile',
      component: () => import('@/views/account/AccountProfile'),
      props: true
    },
    {
      path: 'password',
      name: 'account/password',
      component: () => import('@/views/account/AccountPassword'),
      props: true
    },
    {
      path: 'notifications',
      name: 'account/notifications',
      component: () => import('@/views/account/AccountNotifications'),
      props: true
    }
  ]
};
