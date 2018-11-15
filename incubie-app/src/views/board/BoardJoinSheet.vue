<template>
  <v-bottom-sheet
    ref="joinSheet"
    v-model="isJoinSheetVisible"
    :inset="$vuetify.breakpoint.mdAndUp && isMenuMini"
    hide-overlay
    persistent
    class="bottom-sheet">
    <v-card tile>
      <v-container
        fluid
        class="bottom-sheet__join">
        <v-layout
          fill-height
          justify-center>
          <v-flex
            xs6
            sm4
            md3
            d-flex
            align-center>
            <button
              v-ripple
              class="bottom-sheet__btn"
              @click="$router.go(-1)">
              <h2>Cancel</h2>
              <v-icon
                large
                dark>close
              </v-icon>
            </button>
          </v-flex>
          <v-flex
            xs6
            sm4
            md3
            d-flex
            align-center>
            <button
              v-ripple
              class="bottom-sheet__btn"
              @click="handleJoinBoardClick">
              <h2>Join</h2>
              <v-icon
                large
                dark>add
              </v-icon>
            </button>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-bottom-sheet>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
  name: 'BoardJoinSheet',
  components: {},
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isJoinSheetVisible: false
    }
  },
  computed: {
    ...mapState('ui', ['isMenuMini']),
    ...mapGetters('boards', {
      board: 'current'
    })
  },
  watch: {},
  created () {
    this.isJoinSheetVisible = this.value
  },
  methods: {
    ...mapActions('boards', {
      joinBoard: 'join'
    }),
    async handleJoinBoardClick () {
      try {
        await this.joinBoard()

        this.isJoinSheetVisible = false
      } catch (err) {
        console.log("ruby: join board catch error", err);
        this.isJoinSheetVisible = false
        // TODO: handle error
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "~@/assets/stylus/settings/_variables"

  .bottom-sheet {
    position: relative
    z-index: 4

    &__join {
      background: #008675
      height: $bottom-sheet-join-height
    }

    &__btn {
      color: white
      padding-bottom: $spacers.two.y
      padding-top: $spacers.two.y

      &:focus {
        outline: none
      }
    }
  }
</style>
