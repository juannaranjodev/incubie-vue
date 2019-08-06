import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import beforeEachGuard from './guards/before-each.guard'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: routes
})

router.beforeEach(beforeEachGuard)

export default router
