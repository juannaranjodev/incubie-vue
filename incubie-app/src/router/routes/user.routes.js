export const userRoutes = {
  path: 'u',
  component: () => import('@/views/user/User'),
  children: [
    {
      path: ':userId',
      name: 'user/main',
      component: () => import('@/views/user/UserMain'),
      props: true
    }
  ]
}
