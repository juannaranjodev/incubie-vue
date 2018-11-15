<template>
  <i-container medium>
    <v-layout
      column
      class="add-board">
      <v-flex xs12>
        <h1>Add Board</h1>
        <v-btn
          :to="{ name: 'board/settings' }"
          color="accent"
          fab
          small
          class="add-board__fab">
          <v-icon>add</v-icon>
        </v-btn>
        <hr>
      </v-flex>
      <v-flex xs12>
        <v-list
          three-line
          class="pa-0 mt-5 board__list">
          <template v-for="board in notUserBoards">
            <v-list-tile
              :key="board._id"
              :to="{ name: 'board/main', params: { boardSlug: board.slug } }"
              avatar
              class="board__list__item">
              <v-list-tile-avatar>
                <i-board-icon
                  :board="board"
                  :size="40"/>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title v-html="board.name"/>
                <v-list-tile-sub-title v-html="board.description"/>
              </v-list-tile-content>
              <v-list-tile-action class="board__list__item__action board__list__item__action--reveal">
                <v-btn
                  icon
                  ripple>
                  <v-icon>remove_red_eye</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
            <v-divider :key="`${board._id}-divider`"/>
          </template>
        </v-list>
      </v-flex>
    </v-layout>
  </i-container>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'BoardAdd',
  computed: {
    ...mapGetters('auth', ['loggedInUser']),
    ...mapGetters('users', {
      getUser: 'get'
    }),
    ...mapGetters('boards', {
      boards: 'list',
      getBoards: 'find',
      boardsByNotUser: 'byNotUser'
    }),
    notUserBoards () {
      return this.boardsByNotUser(this.loggedInUser)
    }
  },
  created () {
    if (!this.notUserBoards.length) {
      this.$router.push({ name: 'board/settings' })
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~@/assets/stylus/settings/_variables'
  @import '~@/assets/stylus/settings/_colors'

  .add-board {
    position: relative

    &__fab {
      position: absolute
      right: 0
      top: 0
      transform: translateY(16px)
    }
  }
</style>
