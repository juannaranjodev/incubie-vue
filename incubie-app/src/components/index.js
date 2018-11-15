import icons from './icons'
import menus from './menus'

import IMedia from './IMedia'
import ILoading from './ILoading'
import IImagePicker from './IImagePicker'
import IInfiniteScroll from './IInfiniteScroll'
import IDancingDots from './IDancingDots'
import ILoadingDot from './ILoadingDot'
import IReadMore from './IReadMore'
import ILightBox from './ILightBox'
import IContainer from './IContainer'
import IFileUploader from './IFileUploader'
import IVote from './IVote'
import IParallax from './IParallax'

const IComponents = {
  install (Vue, options) {
    Vue.component('IMedia', IMedia)
    Vue.component('ILoading', ILoading)
    Vue.component('IImagePicker', IImagePicker)
    Vue.component('IInfiniteScroll', IInfiniteScroll)
    Vue.component('IDancingDots', IDancingDots)
    Vue.component('ILoadingDot', ILoadingDot)
    Vue.component('IReadMore', IReadMore)
    Vue.component('ILightBox', ILightBox)
    Vue.component('IContainer', IContainer)
    Vue.component('IFileUploader', IFileUploader)
    Vue.component('IVote', IVote)
    Vue.component('IParallax', IParallax)
  }
}

export {
  icons,
  menus,
  IComponents
}
