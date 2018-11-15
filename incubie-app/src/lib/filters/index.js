import { formatDate, formatDateFromNow } from './format-date.filter'
import { formatNumber } from './format-numbers.filter'
import userBoards from './user-boards.filter'

export default {
  install (Vue, options) {
    Vue.filter('formatDate', formatDate)
    Vue.filter('formatDateFromNow', formatDateFromNow)

    Vue.filter('formatNumber', formatNumber)

    Vue.filter('userBoards', userBoards)
  }
}
