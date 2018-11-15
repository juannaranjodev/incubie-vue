export const ideaRoutes = {
  path: 'i',
  components: {
    default: () => import('@/views/idea/Idea')
    // toolbar: () => import('@/views/idea/components/IdeaToolbar')
  },
  children: [
    {
      name: 'idea/notFound',
      path: '404',
      component: () => import('@/views/idea/IdeaNotFound')
    },
    {
      name: 'idea',
      path: ':idea/:comment?',
      component: () => import('@/views/idea/IdeaMain')
    }
  ]
}
