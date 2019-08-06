<template>
  <v-app>
    <main-toolbar/>
    <main-menu/>
    <main-snackbar/>

    <v-content>
      <router-view v-if="searchText === ''" name="toolbar"/>
      <i-parallax :src="backgroundTile" class="background-image">
        <v-container fluid fill-height ma-0 pa-0>
          <v-layout>
            <div class="main" :class="{'main_search-results': searchText !== ''}">
              <i-loading v-if="isLoading"/>
              <result-main v-else-if="searchText !== ''"/>
              <router-view v-show="searchText === '' && !isLoading" />
            </div>
          </v-layout>
        </v-container>
      </i-parallax>
    </v-content>
  </v-app>
</template>

<script>
  import {
    mapActions,
    mapGetters,
    mapMutations,
    mapState
  } from 'vuex'
  import MainToolbar from './MainToolbar'
  import MainMenu from './MainMenu'
  import MainSnackbar from './MainSnackbar'
  import IdeaCreateDialog from '@/views/idea/components/IdeaCreateDialog'
  import ResultMain from '@/views/result/ResultMain'
  import { get } from 'lodash'


export default {
  name: 'Main',
  components: {
    MainMenu,
    MainToolbar,
    MainSnackbar,
    IdeaCreateDialog,
    ResultMain
  },
  props: {
    slug: {
      type: String,
      required: false,
      default: null
    }
  },
  data () {
    return {
      foo: false,
      backgroundTileNum: 7
    }
  },
  computed: {
    ...mapState('search', {
      "searchText": "value"
    }),
    ...mapState('route', {
      routeParams: 'params'
    }),
    ...mapState('auth', ['actionTypes', 'payload']),
    ...mapGetters('auth', ['loggedInUser']), //ruby test
    ...mapState('ui', ['isLoading', 'sortIdeasBy']),
    ...mapState('companies', {
      isCompanyFindPending: 'isFindPending'
    }),
    ...mapGetters('companies', {
      getCompany: 'get',
      getCompanies: 'find',
      companies: 'list',
      company: 'current',
      getCompanyIdBySlug: 'getIdBySlug'
    }),
    ...mapGetters('boards', {
      getBoardIdBySlug: 'getIdBySlug',
      getBoards: 'find',
      currentBoard: 'current',
      boards: 'list'
    }),
    ...mapGetters('ideas', {
      idea: 'current'
    }),
    backgroundTile () {
      return `/images/geometric-bg--faded.jpg`
    },
    isMainMenuOpen: {
      get () {
        return this.$store.state.app.isMainMenuOpen
      },
      set (value) {
        this.$store.commit('ui/setMainMenuOpen', value)
      }
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler () {
        // this.backgroundTileNum = Math.floor(Math.random() * 7) + 1
      }
    },
    sortIdeasBy: {
      immediate: false,
      async handler () {
        // await this.handleSortIdeasByChange()
      }
    }
  },
  created () {
    this.setMainMenuOpen(false)
  },
  mounted () {
    // ruby test <
      this.$dispatchAction({
        type: this.$actionTypes.GET_INVITED_BOARD,
        entity: this.company._id,
        payload: {user: this.loggedInUser}
      })
    // ruby test >
  },
  destroyed () {},
  methods: {
    ...mapMutations("search", {
      "setSearch": "setValue"
    }),
    ...mapMutations('ui', ['setLoading', 'clearLoading', 'setMainMenuOpen']),
    ...mapMutations('companies', {
      setCurrentCompany: 'setCurrent'
    }),
    ...mapMutations('boards', {
      clearCurrentBoard: 'clearCurrent',
      setCurrentBoard: 'setCurrent'
    }),
    ...mapMutations('ideas', {
      clearCurrentIdea: 'clearCurrent'
    }),
    ...mapMutations('users', {
      setCurrentUser: 'setCurrent',
      clearCurrentUser: 'clearCurrent'
    }),
    ...mapActions('companies', {
      loadCompany: 'load',
      changeCompany: 'changeCompany'
    }),
    ...mapActions('boards', {
      loadBoard: 'load',
      findBoards: 'find',
      setCurrentBoardBySlug: 'setCurrentBySlug'
    }),
    ...mapActions('ideas', {
      findIdeasBySort: 'findBySort',
      getIdeas: 'find',
      getIdea: 'get',
      loadIdea: 'loadIdea'
    }),
    ...mapActions('users', {
      loadUser: 'load',
      unloadUser: 'unload'
    }),
    async handleSortIdeasByChange () {
      try {
        await this.findIdeasBySort()
      } catch (err) {
        // TODO: handle error
      }
    }
  }
}
</script>

<style lang="stylus">
  @import "~@/assets/stylus/settings/_variables";

  .main {
    position: relative
    width: 100%

    &_search-results {
      @media $display-breakpoints.sm-and-down {
        background: #D8D8D8;
      }
    }
  }

  .overlay {
    position: absolute
    top: 0
    bottom: 0
    left: 0
    right: 0
  }

  .background-image {
    background-size: cover
  }
</style>
