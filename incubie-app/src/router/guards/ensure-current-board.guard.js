import store from '@/store'
import { get } from 'lodash'

export default async (to, from, next) => {
  const slug = to.params.boardSlug
  const currentBoard = store.getters['boards/current']
  const currentSlug = get(currentBoard, 'slug')

  if (slug !== currentSlug) {
    await store.dispatch('boards/setCurrentBySlug', slug)
  }

  next()
}
