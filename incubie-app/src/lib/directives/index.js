import sticky from './sticky.directive'

export default {
  install (Vue, options) {
    Vue.directive('sticky', sticky)
  }
}
