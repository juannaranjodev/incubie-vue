import store from '@/store'
import { get } from 'lodash'

export default function filterIdeasByBoard (boardId) {
  // board is a board object, not id - this doesn't work
  const ideas = store.getters['ideas/find']({
    query: {
      board: boardId
    }
  })

  return get(ideas, 'data')
}
