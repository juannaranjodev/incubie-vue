export const notFoundRoute = {
  path: '/404',
  component: () => import('@/views/error/Error'),
  children: [
    {
      path: '',
      name: 'notFound',
      component: () => import('@/views/error/NotFound')
    }
  ]
}

export const unauthorizedRoute = {
  path: '/401',
  component: () => import('@/views/error/Error'),
  children: [
    {
      path: '',
      name: 'unauthorized',
      component: () => import('@/views/error/Unauthorized')
    }
  ]
}

export const unauthorizedCompanyRoute = {
  path: '401',
  name: 'unauthorized/company',
  component: () => import('@/views/error/Unauthorized')
}
