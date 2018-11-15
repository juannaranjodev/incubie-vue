export const boardRoutes = {
  path: 'b',
  components: {
    default: () => import('@/views/board/Board'),
    toolbar: () => import('@/views/board/BoardToolbar')
  },
  children: [
    {
      path: '404',
      name: 'board/notFound',
      component: () => import('@/views/board/BoardNotFound.vue')
    },
    {
      path: 'add',
      name: 'board/add',
      props: true,
      component: () => import('@/views/board/BoardAdd')
    },
    {
      path: ':boardSlug?/settings',
      name: 'board/settings',
      props: true,
      component: () => import('@/views/board/BoardSettings')
    },
    {
      path: ':boardSlug/:createIdea?',
      name: 'board/main',
      props: true,
      component: () => import('@/views/board/BoardMain')
    },
    // ruby test <
    {
      path: ':boardSlug?/update',
      name: 'board/update',
      props: true,
      component: () => import('@/views/board/BoardUpdate')
    },    
    // ruby test >

  ]
}
