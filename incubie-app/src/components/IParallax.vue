<template>
  <div
    ref="parallax"
    :style="styleList"
    class="i-parallax">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'IParallax',
  components: {},
  props: {
    src: {
      type: String,
      required: true,
      default: ''
    },
    speed: {
      type: Number,
      required: false,
      default: 4
    },
    repeat: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {}
  },
  computed: {
    styleList () {
      return {
        backgroundImage: `url(${this.src}`,
        backgroundRepeat: this.repeat ? 'repeat' : 'no-repeat',
        backgroundSize: this.repeat ? 'auto' : 'cover'
      }
    }
  },
  watch: {},
  created () {},
  mounted () {
    window.addEventListener('scroll', this.parallax)
  },
  methods: {
    parallax () {
      const slider = this.$refs.parallax
      const pageYOffset = window.pageYOffset
      let coords = '0 0'

      if (pageYOffset > 0) {
        const yPos = pageYOffset / this.speed
        coords = `0 ${yPos}px`
      }

      slider.style.backgroundPosition = coords
    }
  }
}
</script>

<style lang="stylus">
  .i-parallax {
    height: 100%
    transition: background-position 0s linear
  }
</style>
