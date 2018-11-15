import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import Vuetify from 'vuetify'
import {
  sync
} from 'vuex-router-sync'
import helpers from '@/lib/helpers'
import filters from '@/lib/filters'
import directives from '@/lib/directives'
import {
  IComponents,
  icons,
  menus
} from '@/components'
import './registerServiceWorker'

import '@/assets/stylus/main.styl'
import VuetifyConfirm from 'vuetify-confirm'

// ray test added for stripe vue elements
import VueStripeCheckout from 'vue-stripe-checkout';
import { stripeOptions } from '@/constants';
const options = {
  key: stripeOptions.stripePubKey,
  // ray test block for now image: '/images/favicon-64x64.png',
  locale: 'auto',
  currency: 'usd',
  billingAddress: true,
  panelLabel: 'Subscribe {{amount}}'
}
Vue.use(VueStripeCheckout, options);

Vue.config.productionTip = false

Vue.use(helpers)
Vue.use(directives)
Vue.use(icons)
Vue.use(menus)
Vue.use(IComponents)
Vue.use(filters)

Vue.use(Vuetify, {
  theme: {
    primary: '#0f0f10',
    secondary: '#454545',
    tertiary: '#A1A1A7',
    accent: '#8CBDD3',
    accentDark: '#5F9AB3',
    accentDarker: '#3C7994',
    accentLight: '#BCDDEB',
    accentLighter: '#EAF6FB',
    error: '#EB5959',
    warning: '#EBC259',
    info: '#3C7994',
    success: '#40A96A',
    committed: '#7ED321',
    proposed: '#F8E71C',
    closed: '#979797',
    companyPurple: '#7C409D',
    companyYellow: '#EBC259',
    companyOrange: '#EBA659',
    companyGreen: '#40A96A',
    companyRed: '#EB5959',
    companyPink: '#C44A84',
    companyTeal: '#399684'
  }
})

Vue.use(VuetifyConfirm, {
  buttonTrueText: 'OK',
  buttonFalseText: 'Cancel',
  color: 'warning',
  icon: 'warning',
  title: 'Warning',
  width: 300,
  property: '$confirm'
})

sync(store, router)

const app = new Vue({
  router,
  store,
  mixins: [],
  render: h => h(App)
})


//export const globalConstant = require("./globalConstant");

app.$mount('#app')