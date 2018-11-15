import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import feathersVuex from 'feathers-vuex'
import feathersClient from '@/feathers-client'
import {
  localStorageKey
} from '@/constants'
import authManagement from './modules/auth-management.store'
import users from './modules/users.store'
import companyManagement from './modules/company-management.store'
import boardManagement from './modules/board-management.store'
import companies from './modules/companies.store'
import boards from './modules/boards.store'
import ui from './modules/ui.store'
import authentication from './modules/auth.store'
import events from './events'
import actions from './modules/actions.store'
import notifiers from './modules/notifiers.store'
import permissions from './modules/permissions.store'
import uploads from './modules/uploads.store'
import ideas from './modules/ideas.store'
import comments from './modules/comments.store'
import votes from './modules/votes.store'
import feed from './modules/feed.store'
import snackbar from './modules/snackbar.store'
import search from './modules/search.store';
import worker from "./modules/worker.store";


const {
  service,
  auth,
  FeathersVuex
} = feathersVuex(feathersClient, {
  idField: '_id'
})


const vuexLocal = new VuexPersistence({
  key: localStorageKey,
  storage: window.localStorage,
  modules: ['ui'
  //, 'users', 'ideas', 'comments', 'boards', 'invitations'
  ]
})

Vue.use(Vuex)
Vue.use(FeathersVuex)
Vue.use(events, {
  feathersClient
})

const store = new Vuex.Store({
  plugins: [
    vuexLocal.plugin,

    auth(authentication),
    service('users', users),

    service('companies', companies),
    service('invitations'),
    service('boards', boards),
    service('ideas', ideas),
    service('comments', comments)
  ],
  modules: {
    authManagement,
    companyManagement,
    boardManagement,
    actions,
    notifiers,
    permissions,
    ui,
    uploads,
    votes,
    feed,
    snackbar,
    search,
    worker
  },
  state: {},
  actions: {

  },
  mutations: {}
});


export default store;