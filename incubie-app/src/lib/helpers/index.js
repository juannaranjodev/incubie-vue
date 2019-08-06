import store from '@/store'
import filterIdeasByBoard from './filter-ideas-by-board.helper'
import actionTypes from '@/store/action-types'
import validationRules from './validation-rules'
import * as constants from '@/constants'

export default {
  install (Vue, options) {
    Vue.prototype.$filterIdeasByBoard = filterIdeasByBoard

    Vue.prototype.$actionTypes = actionTypes

    Vue.prototype.$dispatchAction = function (payload) {
      return store.dispatch('actions/dispatch', payload)
    }

    Vue.prototype.$rules = validationRules
    Vue.prototype.$constants = constants
  }
}
