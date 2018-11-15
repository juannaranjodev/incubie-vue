<template>
  <div
    :class="{ 'media--align-center': alignCenter }"
    class="media u__break-word">
    <div class="media__figure">
      <slot name="figure"/>
    </div>
    <div class="media__body">
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IMedia',
  components: {},
  props: {
    alignCenter: {
      type: Boolean,
      default: false
    }
  },
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
  @import "~@/assets/stylus/settings/_variables.styl"

  .media {
    display: flex
    align-items: flex-start

    &--align-center {
      align-items: center
    }

    &__figure {
      margin-right: $spacer
    }

    &__body {
      flex: 1
      min-width: 50%
      word-wrap: break-word
    }
  }
</style>
