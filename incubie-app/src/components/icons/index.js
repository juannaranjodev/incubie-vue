import IUserIcon from './IUserIcon'
import IBoardIcon from './IBoardIcon'
import IUser from './IUser'
import ICompanyIcon from './ICompanyIcon'

export default {
  install (Vue, options) {
    Vue.component('IUser', IUser)
    Vue.component('IUserIcon', IUserIcon)
    Vue.component('IBoardIcon', IBoardIcon)
    Vue.component('ICompanyIcon', ICompanyIcon)
  }
}
