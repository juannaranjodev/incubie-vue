<template>
  <div class="spinner">
    <div class="bounce1"/>
    <div class="bounce2"/>
    <div class="bounce3"/>
  </div>
</template>

<script>
export default {
  name: 'IDancingDots',
  components: {},
  props: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  methods: {}
}
</script>

<style lang="stylus" scoped>
  @import "~@/assets/stylus/settings/_variables"

  .spinner {
    margin: $spacers.five.y auto
    text-align: center
    width: 70px

    > div {
      animation: sk-bouncedelay 1.4s infinite ease-in-out both
      background-color: #333
      border-radius: 100%
      display: inline-block
      height: 18px
      width: 18px
    }

    .bounce1 {
      animation-delay: -0.32s
    }

    .bounce2 {
      animation-delay: -0.16s
    }
  }

  @keyframes sk-bouncedelay {
    0%, 80%, 100% {
      transform: scale(0)
    }
    40% {
      transform: scale(1.0)
    }
  }
</style>
