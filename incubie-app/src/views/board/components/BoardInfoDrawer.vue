<template>
  <div
    :class="classList"
    :style="styleList"
    class="drawer">
    <v-btn
      dark
      flat
      icon
      class="drawer__close-btn"
      @click="hide">
      <v-icon
        :size="32"
        color="tertiary">close
      </v-icon>
    </v-btn>
    <div class="drawer__main">
      <div class="drawer__icon">
        <i-board-icon
          :board="board"
          :size="155"/>
      </div>

      <h2 class="headline">{{ board.name }}</h2>
      <em class="grey--text">
        Created by {{ getFullName(getUser(board.createdBy)) }} on {{ board.createdDate | formatDate }}
      </em>
      <p class="mt-3">{{ board.description }}</p>

      <div class="drawer__collaborators">
        <div class="drawer__collaborators__header">
          <h2 class="subheading ml-3">Collaborators</h2>
          <v-layout
            align-center
            justify-end
            row
            fill-height>
            <v-btn
              icon
              flat
              dark>
              <v-icon>
                group_add
              </v-icon>
            </v-btn>
          </v-layout>
        </div>

        <ul class="drawer__collaborators__list">
          <li
            v-for="user in users"
            :key="user._id"
            class="drawer__collaborators__list__item">
            <i-user-icon
              :user="user"
              :size="18"
              dark
              class="mr-1"/>
            {{ getFullName(user) }}
            <em v-if="user.role === 'admin'">(Admin)</em>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'BoardInfo',
  components: {},
  props: {
    value: {
      type: Boolean,
      required: true
    },
    board: {
      type: Object,
      required: true,
      default: () => {}
    },
    absolute: {
      type: Boolean,
      required: false,
      default: false
    },
    width: {
      type: Number,
      required: false,
      default: 368
    }
  },
  data () {
    return {}
  },
  computed: {
    ...mapGetters('users', {
      getUser: 'get',
      getFullName: 'fullName'
    }),
    ...mapGetters('boards', {
      getBoardUsers: 'getUsers'
    }),
    classList () {
      return { 'drawer--visible': this.value }
    },
    styleList () {
      return { flexBasis: `${this.width}px` }
    },
    createdBy () {
      return this.getUser(this.board.createdBy)
    },
    users () {
      return this.getBoardUsers(this.board._id)
    }
  },
  watch: {},
  created () {},
  methods: {
    hide () {
      this.$emit('input', false)
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "~@/assets/stylus/settings/_variables"
  @import "~@/assets/stylus/settings/_colors"

  .drawer {
    background: $theme.secondary
    border-top: 1px solid #1b5a5b
    flex-grow: 0
    flex-shrink: 0
    height: 100%
    overflow-y: scroll
    width: 368px

    &--visible {

    }

    &__close-btn {
      position: absolute
      right: 0
      top: 0
      z-index: 4
    }

    &__main {
      color: #fff
      display: flex
      flex-direction: column
      padding: $spacers.four.y $spacers.four.x
      width: 100%
    }

    &__icon {
      display: flex
      justify-content: center
      margin: $spacers.three.y auto
      width: 100%
    }

    &__collaborators {
      margin: $spacers.three.y 0

      &__header {
        align-items: center
        border-bottom: 1px solid $grey.base
        display: flex
        padding: $spacers.one.y 0
      }

      &__list {
        list-style: none
        margin: 0
        padding: $spacers.three.y 0

        &__item:not(:last-child) {
          margin-bottom: $spacers.three.y
        }
      }
    }
  }
</style>
