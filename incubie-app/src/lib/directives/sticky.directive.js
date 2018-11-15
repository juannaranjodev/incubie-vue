import stickybits from 'stickybits'
import { get } from 'lodash'

export default {
  bind (el, binding) {
    let offset = get(binding, 'value.offset', 0)
    let options = {
      stickyBitStickyOffset: offset
    }

    el.$stickybits = stickybits(el, options)
  },
  componentUpdated (el) {
    el.$stickybits.update()
  },
  unbind (el) {
    el.$stickybits.cleanup()
  }
}
