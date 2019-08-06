<template>
  <v-avatar
    :size="size"
    class="i-board-icon">
    <img
      v-if="board.image"
      :src="board.image"
      :alt="board.name">
    <div
      v-else
      ref="textIcon"
      class="headline">
      <span
        :style="{ fontSize: fontSize }"
        class="i-board-icon__letter">
        {{ firstLetter(board.name) }}
      </span>
    </div>
  </v-avatar>
</template>

<script>
export default {
  name: 'IBoardIcon',
  props: {
    board: {
      type: Object,
      required: true
    },
    size: {
      type: Number,
      required: false,
      default: 54
    }
  },
  data () {
    return {
      width: 0
    }
  },
  computed: {
    color () {
      return this.board.color || '#e0e0e0'
    },
    fontSize () {
      return `${this.size / 2.25}px`
    }
  },
  watch: {
    size: {
      immediate: true,
      handler () {
        this.width = this.size
      }
    }
  },
  methods: {
    firstLetter (name) {
      return name ? name.substr(0, 1) : ''
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "~@/assets/stylus/settings/_variables"
  @import "~@/assets/stylus/settings/_colors"

  .i-board-icon {
    transform-origin: center left
    transition: all .3s $transition.swing

    div {
      align-items: center
      border-radius: 50%
      background-color: $grey.darken-3
      color: $theme.accentLighter
      border: 1px solid $theme.accent
      display: flex
      font-weight: bold
      height: 100%
      justify-content: center
      width: 100%
    }

    &__letter {
      transform: translateY(1px)
    }
  }
</style>
