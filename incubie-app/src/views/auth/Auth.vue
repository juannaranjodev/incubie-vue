<template>
  <v-app class="auth">
    <v-content class="u__geometric-bg u__geometric-bg--dark">
      <v-container
        class="pa-0"
        fluid
        fill-height>
        <v-layout
          align-center
          justify-center
          wrap>
          <v-flex xs12>
            <v-container class="pa-0">
              <v-layout wrap>
                <v-flex
                  class="text-xs-center"
                  xs12>
                  <div class="mb-4">
                    <img src="/images/incubie-logo.svg">
                  </div>
                </v-flex>

                <v-flex
                  class="auth__main u__mobile-container elevation-12"
                  xs12>
                  <v-tabs
                    dark
                    color="secondary"
                    grow>
                    <v-tab
                      key="signup"
                      to="/signup">
                      Sign Up
                    </v-tab>
                    <v-tab
                      key="login"
                      to="/login">
                      Log In
                    </v-tab>
                    <v-tabs-items>
                      <v-slide-x-transition mode="out-in">
                        <router-view/>
                      </v-slide-x-transition>
                    </v-tabs-items>
                  </v-tabs>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'Auth',
  components: {},
  props: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  async destroyed () {
    this.$store.commit('auth/clearAuthenticateError')
    this.$store.commit('auth/unsetAuthenticatePending')
  },
  methods: {}
}
</script>

<style lang="stylus">
  @import '~@/assets/stylus/settings/_variables'
  @import '~@/assets/stylus/settings/_colors'

  .auth {
    .auth__tagline {
      color: white
      font-size: $headings.h4.size
      margin: $spacer-y 0
      text-transform: uppercase

      @media $display-breakpoints.xs-only {
        font-size: $headings.h5.size
        margin: ($spacer-y / 2) 0
      }
    }

    .auth__main {
      background-color: rgba(255, 255, 255, 0.85)
    }

    &__title {
      align-items: flex-start
      flex-direction: column
    }

    .tabs {
      .tabs__bar {
        background-color: #19A1A4
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5)

        .tabs__item {
          color: rgba(255, 255, 255, 0.7)
        }

        .tabs__item--active {
          color: rgba(255, 255, 255, 1)
        }
      }
    }

    .auth__card {
      text-align: left
      background: rgba(0, 0, 0, 0) !important
    }

    .auth__provider {
      align-items: center
      display: flex
      flex-direction: column
      width: 100%
    }

    .auth__form {
    }

    .auth__divider {
      align-items: center
      display: flex
      justify-content: space-between
      margin: $spacers.three.y 0
      width: 100%

      > span {
        &:nth-child(2) {
          color: rgba(0, 0, 0, 0.3)
          font-weight: bold
          font-size: 85%
          margin: 0 ($spacer-x / 2)
          text-transform: uppercase
        }

        &:nth-child(1), &:nth-child(3) {
          background-color: rgba(0, 0, 0, 0.12)
          display: flex
          flex-grow: 1
          height: 1px
        }
      }
    }

    .btn {
      width: 100%

      &.btn__social {
        margin: 0

        i {
          display: inline-block
          height: 22px
          margin-right: 1rem
          width: 22px
        }

        & + .btn__social {
          margin-top: $spacers.two.y
        }
      }
    }
  }
</style>
