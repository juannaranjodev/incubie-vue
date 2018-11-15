<template>
  <v-container :class="classList">
    <slot/>
  </v-container>
</template>

<script>
export default {
  name: 'IContainer',
  components: {},
  props: {
    small: {
      type: Boolean,
      default: false
    },
    medium: {
      type: Boolean,
      default: true
    },
    large: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {}
  },
  computed: {
    classList () {
      return {
        'i-container': true,
        'i-container--small': this.small,
        'i-container--medium': this.medium,
        'i-container--large': this.large
      }
    }
  },
  watch: {},
  created () {},
  methods: {}
}
</script>

<style lang="stylus">
  @import "~@/assets/stylus/settings/_variables"

  .container {

    &.i-container {
      margin: 0
      padding: $spacers.two.y $spacers.two.x
      width: 100%

      @media $display-breakpoints.md-and-up {
        margin: 0
        padding: $spacers.four.y $spacers.four.x
      }

      &--small {
        max-width: 100%
        width: 388px
      }

      &--medium {
        max-width: 100%
        width: 892px
      }

      &--large {
        max-width: 100%
        width: 960px
      }
    }
  }
</style>
