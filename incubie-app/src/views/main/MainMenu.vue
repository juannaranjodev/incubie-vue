<template>
  <v-navigation-drawer
    :value="isMainMenuOpen"
    :mini-variant="$vuetify.breakpoint.mdAndUp && isMainMenuMini"
    :permanent="$vuetify.breakpoint.mdAndUp"
    :clipped="true"
    app
    class="secondary darken-1 main-menu"
    width="220"
    @input="setMainMenuOpen">
    <v-list
      dark
      two-line
      class="pa-0 transparent">
      <v-list-tile
        :class="{ 'v-list__tile--highlighted': isUserMenuVisible }"
        avatar
        class="main-menu__whoami"
        @click="toggleUserMenu">
        <v-list-tile-avatar v-if="$vuetify.breakpoint.mdAndUp && isMainMenuMini">
          <i-company-icon
            :company="company"
            :size="40"/>
        </v-list-tile-avatar>

        <v-list-tile-content>
          <v-list-tile-title
            class="main-menu__company-name">
            {{ company.name }}
            <v-icon
              :size="16"
              class="main-menu__user-menu-arrow">keyboard_arrow_down
            </v-icon>
          </v-list-tile-title>
          <v-list-tile-sub-title>
            {{ loggedInUser.firstName }}
            {{ loggedInUser.lastName }}
          </v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider inset/>

      <v-menu
        v-model="isUserMenuVisible"
        :min-width="300"
        :position-x="8"
        :position-y="124"
        class="main-menu__user-menu">
        <v-card>
          <v-list
            two-line
            class="pa-0">
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <i-user-icon
                  :user="loggedInUser"
                  :size="40"/>
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title class="font-weight-bold">
                  {{ loggedInUser.firstName }}
                  {{ loggedInUser.lastName }}
                </v-list-tile-title>
                <v-list-tile-sub-title>{{ loggedInUser.voteCount }} points</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>

          <v-list
            dense
            class="pt-0">
            <v-list-tile :to="{ name: 'account/profile' }">
              <v-list-tile-title class="body-2">Profile &amp; account</v-list-tile-title>
            </v-list-tile>
            <v-list-tile :to="{ name: 'logout' }">
              <v-list-tile-title class="body-2">Sign out</v-list-tile-title>
            </v-list-tile>
          </v-list>

          <v-spacer class="main-menu__user-menu__spacer"/>

          <div v-if="isAdmin(loggedInUser, company._id)">
            <v-list
              class="pb-0">
              <v-list-tile avatar>
                <v-list-tile-avatar>
                  <i-company-icon
                    :company="company"
                    :size="40"/>
                </v-list-tile-avatar>

                <v-list-tile-content>
                  <v-list-tile-title class="font-weight-bold">
                    {{ company.name }}
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>

            <v-list
              v-if="isAdmin(loggedInUser, company._id)"
              dense
              class="pt-0">
              <v-list-tile :to="{ name: 'company/home' }">
                <v-list-tile-title class="body-2">Administration</v-list-tile-title>
              </v-list-tile>
              <v-list-tile :to="{ name: 'company/members' }">
                <v-list-tile-title class="body-2">Invite members</v-list-tile-title>
              </v-list-tile>
            </v-list>

            <v-spacer class="main-main__user-menu__spacer main-menu__user-menu__spacer--minor"/>

            <v-list
              dense
              two-line>
              <v-list-tile :to="{ name: 'company/home' }">
                <v-list-tile-content>
                  <v-list-tile-title class="body-2 font-weight-bold">Total Ideas</v-list-tile-title>
                  <v-list-tile-sub-title>{{ company.ideasCount }} / {{ allowedIdeasCount }}</v-list-tile-sub-title>
                </v-list-tile-content>

                <v-list-tile-action>
                  <v-progress-circular
                    :value="ideasCountPercentage"
                    :color="ideasCountProgressColor"
                    :width="5"
                    :size="50"
                    :rotate="270"/>
                </v-list-tile-action>
              </v-list-tile>
            </v-list>

            <v-spacer class="main-menu__user-menu__spacer main-menu__user-menu__spacer--minor"/>

            <v-list
              dense
              two-line>
              <v-list-tile :to="{ name: 'company/members' }">
                <v-list-tile-content>
                  <v-list-tile-title class="body-2 font-weight-bold">Total Members</v-list-tile-title>
                  <v-list-tile-sub-title>{{ users.length }} / {{ allowedMembersCount }}</v-list-tile-sub-title>
                </v-list-tile-content>

                <v-list-tile-action>
                  <v-progress-circular
                    :value="membersCountPercentage"
                    :color="membersCountProgressColor"
                    :width="5"
                    :size="50"
                    :rotate="270"/>
                </v-list-tile-action>
              </v-list-tile>
            </v-list>

            <v-spacer class="main-menu__user-menu__spacer main-menu__user-menu__spacer--minor"/>

            <v-list
              dense>
              <v-list-tile :to="{ name: 'company/home' }">
                <v-list-tile-title class="body-2">See paid plans</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </div>

          <v-spacer class="main-menu__user-menu__spacer"/>

          <v-list
            v-if="otherCompanies.length"
            dense>
            <v-list-tile
              v-for="company in otherCompanies"
              :key="company._id"
              :to="{ name: 'login', params: { slug: company.slug, userId: loggedInUser._id } }">
              <v-list-tile-title class="body-2">
                Switch to <span class="font-weight-bold">{{ company.name }}</span>
              </v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-menu>
    </v-list>

    <v-list
      dark
      class="pt-0 transparent main-menu__boards">
      <v-list-tile
        v-ripple
        :to="{ name: 'feed/main' }"
        :class="{ 'main-menu__boards--active home-icon': routeName === 'feed/main' }"
        light>
        <v-list-tile-action>
          <v-tooltip
            v-if="isMainMenuMini && $vuetify.breakpoint.mdAndUp"
            right>
            <v-icon
              slot="activator"
              :size="32"
              color="grey lighten-1">
              home
            </v-icon>
            <span color="grey--text">Home</span>
          </v-tooltip>
          <v-icon
            v-else
            :size="32"
            color="secondary lighten-3">home
          </v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title class="grey--text">Home Board</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile
        v-ripple
        v-for="(board, index) in userBoards"
        :to="{ name: 'board/main', params: { boardSlug: board.slug } }"
        :key="board._id"
        :class="{ 'main-menu__boards--active': board._id === currentBoardId }">
        <v-list-tile-action>
          <v-tooltip
            v-if="isMainMenuMini && $vuetify.breakpoint.mdAndUp"
            right>
            <i-board-icon
              slot="activator"
              :board="board"
              :class="{ 'pulse-animation': !ideas.length && !boards.length && index === 0 }"
              :size="32"/>
            {{ board.name }}
          </v-tooltip>
          <i-board-icon
            v-else
            :board="board"
            :class="{ 'pulse-animation': !ideas.length && !boards.length && index === 0 }"
            :size="32"/>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ board.name }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile
        :to="{ name: 'board/add', params: { slug: company.slug } }">
        <v-list-tile-action>
          <v-tooltip
            v-if="isMainMenuMini && $vuetify.breakpoint.mdAndUp"
            right>
            <v-icon
              slot="activator"
              :size="32">
              add_circle_outline
            </v-icon>
            Add Board
          </v-tooltip>
          <v-icon
            v-else
            :size="32">add_circle_outline
          </v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Add Board</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex'

export default {
  name: 'MainMenu',
  components: {},
  props: {},
  data () {
    return {
      isUserMenuVisible: false
    }
  },

  computed: {
    ...mapState('route', {
      routeName: 'name'
    }),
    ...mapState('ui', ['isMainMenuOpen', 'isMainMenuMini']),
    ...mapGetters('auth', {
      loggedInUser: 'loggedInUser',
      company: 'loggedInUserCompany'
    }),
    ...mapGetters('companies', {
      // company: 'current',
      companies: 'list',
      allowedIdeasCount: 'allowedIdeasCount',
      allowedMembersCount: 'allowedMembersCount'
    }),
    ...mapGetters('users', {
      users: 'list',
      isAdmin: 'isAdmin'
    }),
    ...mapGetters('boards', {
      currentBoardId: 'currentId',
      getBoard: 'get',
      boards: 'list',
      boardsByUser: 'byUser'
    }),
    ...mapGetters('ideas', {
      ideas: 'list'
    }),
    otherCompanies () {
      return this.companies.filter(company => {
        return company._id !== this.company._id
      })
    },
    ideasCountPercentage () {
      return (this.company.ideasCount / this.allowedIdeasCount) * 100
    },
    ideasCountProgressColor () {
      if (this.ideasCountPercentage > 75) {
        return 'red'
      } else if (this.ideasCountPercentage > 50) {
        return 'yellow'
      } else {
        return 'green'
      }
    },
    membersCountPercentage () {
      return (this.users.length / this.allowedMembersCount) * 100
    },
    membersCountProgressColor () {
      if (this.membersCountPercentage > 75) {
        return 'red'
      } else if (this.membersCountPercentage > 50) {
        return 'yellow'
      } else {
        return 'green'
      }
    },
    userBoards () {
      return this.boardsByUser(this.loggedInUser)
    }
  },
  watch: {},
  created () {},
  methods: {
    ...mapMutations('ui', ['setMainMenuOpen']),
    toggleUserMenu () {
      this.isUserMenuVisible = !this.isUserMenuVisible
    }
  }
}
</script>

<style lang="stylus">
  @import '~@/assets/stylus/settings/_variables'
  @import '~@/assets/stylus/settings/_colors'

  .main-menu {

    &__text {
      color: #b7c7c9
    }

    &__whoami {

    }
    &__home-icon {
      color: $theme.secondary
    }
    &__company-name {
      font-size: $headings.h6.size
      font-weight: bold
    }

    &__user-menu {
      display: none !important
      &-arrow {
        opacity: .4
        transform: translateY(-25%)
      }

      &__spacer {
        border-bottom: 1px solid rgba(0, 0, 0, .12)

        &--minor {
          margin: 0 $spacers.three.x
          width: 33.333%
        }
      }
    }

    &__boards {

      .v-list__tile {
        filter: grayscale(100%)
        opacity: .5

        &:hover {
          background: rgba(255, 255, 255, 0.12) !important
        }
      }

      &--active {
        .v-list__tile {
          background: rgba(255, 255, 255, 0.12) !important
          filter: grayscale(0%)
          opacity: 1

          &__title {
            color: white !important
            font-font-weight: bolder
          }
        }
      }
    }
  }
</style>
