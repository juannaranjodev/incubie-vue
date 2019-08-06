export const feedMainRoute = {
  path: '',
  components: {
    default: () => import('@/views/feed/Feed'),
    toolbar: () => import('@/views/feed/FeedToolbar')
  },
  children: [
    {
      path: ':createIdea?',
      name: 'feed/main',
      component: () => import('@/views/feed/FeedMain'),
      props: true
    }
    // {
    //   path: 'i/create',
    //   name: 'feed/idea/create',
    //   component: () => import('@/views/feed/FeedMain'),
    //   props: {
    //     createIdea: true
    //   }
    // }
  ]
}
