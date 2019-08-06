<template>
  <transition
    name="fade"
    appear>
    <div
      v-if="isActive"
      class="i-lightbox">
      <button class="i-lightbox__close">
        <v-icon :size="$vuetify.breakpoint.xsOnly ? 32 : 64">close</v-icon>
      </button>
      <div
        ref="viewer"
        class="i-lightbox__viewer">
        <div class="i-lightbox__current">
          <img :src="images[index].url">
        </div>

        <button
          class="i-lightbox__control i-lightbox__control--prev"
          @click="previous">
          <v-icon :size="$vuetify.breakpoint.xsOnly ? 32 : 64">navigate_before</v-icon>
        </button>
        <button
          class="i-lightbox__control i-lightbox__control--next"
          @click="next">
          <v-icon :size="$vuetify.breakpoint.xsOnly ? 32 : 64">navigate_next</v-icon>
        </button>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'ILightBox',
  components: {},
  props: {
    images: {
      type: Array,
      required: true,
      default: () => []
    }
    // value: {
    //   type: Boolean,
    //   required: true,
    //   default: false
    // }
  },
  data () {
    return {
      overlayActiveClass: 'i-overlay--active',
      isActive: false,
      index: 0
    }
  },
  computed: {},
  watch: {
    isActive: {
      immediate: true,
      handler (isActive) {
        if (!this.overlay) {
          this.genOverlay()
        }

        if (isActive) {
          this.showOverlay()
        } else {
          this.hideOverlay()
        }
      }
    }
  },
  created () {},
  mounted () {},
  destroyed () {
    this.disableListeners()
  },
  methods: {
    genOverlay () {
      this.overlay = document.createElement('div')
      this.overlay.classList.add('i-overlay')

      const parent = document.querySelector('[data-app]')

      if (parent) {
        parent.insertBefore(this.overlay, parent.firstChild)
      }
    },
    showOverlay () {
      this.overlay.classList.add(this.overlayActiveClass)
      this.isActive = true
    },
    hideOverlay () {
      this.overlay.classList.remove(this.overlayActiveClass)
      this.isActive = false
    },
    clickOutsideListener (e) {
      if (this.closeConditional(e)) {
        this.close()
      }
    },
    keyupListener (e) {
      const charCode = e.which

      if (charCode === 39) {
        this.next()
      } else if (charCode === 37) {
        this.previous()
      } else if (charCode === 27) {
        this.close()
      }
    },
    enableListeners () {
      this.$nextTick(() => {
        document.body.addEventListener('click', this.clickOutsideListener)
        document.body.addEventListener('keyup', this.keyupListener)
      })
    },
    disableListeners () {
      document.body.removeEventListener('click', this.clickOutsideListener)
      document.body.removeEventListener('click', this.keyupListener)
    },
    closeConditional (e) {
      const target = e.target
      const viewer = this.$refs.viewer

      if (viewer.contains(target) || !this.isActive) {
        return false
      } else {
        return true
      }
    },
    open (i = 0) {
      this.isActive = true
      this.index = i
      this.enableListeners()
    },
    close () {
      this.isActive = false
      this.index = 0
      this.disableListeners()
    },
    next () {
      const next = ((this.index + 1) > (this.images.length - 1)) ? 0 : this.index + 1
      this.index = next
    },
    previous () {
      const previous = this.index - 1 < 0 ? this.images.length - 1 : this.index - 1
      this.index = previous
    }
  }
}
</script>

<style lang="stylus">
  @import "~@/assets/stylus/settings/_variables.styl"

  .i-lightbox {
    align-items: center
    bottom: 0
    display: flex
    justify-content: center
    left: 0
    padding: $spacers.one.y $spacers.one.x
    position: fixed
    right: 0
    top: 0
    z-index: 6

    &__close {
      position: fixed
      right: $spacer
      top: $spacer
    }

    &__viewer {
      align-items: center
      display: flex
      max-width: 968px
    }

    &__current {
      order: 2

      img {
        height: 100%
        object-fit: contain
        width: 100%
      }
    }

    &__control {

      &--prev {
        order: 1
      }

      &--next {
        order: 3
      }
    }
  }

  .i-overlay {
    height: 100vh
    left: 0
    pointer-events: none
    position: fixed
    transition: 0.5s cubic-bezier(0.25, 0.8, 0.5, 1)
    top: 0
    width: 100vw
    z-index: 5

    &:before {
      background-color: rgb(216, 216, 216)
      bottom: 0
      content: ""
      height: 100%
      left: 0
      opacity: 0
      position: absolute
      right: 0
      top: 0
      transition: inherit
      transition-delay: .15s
      width: 100%
    }

    &--active {
      pointer-events: auto
      touch-action: none

      &:before {
        opacity: .9
      }
    }
  }
</style>
