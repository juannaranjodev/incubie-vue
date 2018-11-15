<template>
  <div class="u__main-container">
    <v-card class="user-card u__clipped-container mb-5">
      <v-card-text>
        <i-media>
          <i-user-icon
            v-if="user.avatar"
            slot="figure"
            :user="user"
            :size="breakpoint ? 92 : 155"
            class="user-card__avatar mr-4"/>
          <div class="user-card__body">
            <h1 class="headline mb-1">{{ getFullName(user) }}</h1>
            <div class="title mb-1">{{ company.name }}</div>
            <div class="subheading">
              <span class="pr-2">{{ user.voteCount }} Points</span>
              <span>{{ ideasCount }} Ideas</span>
            </div>
          </div>
        </i-media>
      </v-card-text>
    </v-card>

    <idea-list :ideas="ideas"/>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import IdeaList from '@/views/idea/components/IdeaList'
import store from '@/store'
import { get } from 'lodash'

export default {
  name: 'UserMain',
  components: {
    IdeaList
  },
  props: {
    userId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {}
  },
  computed: {
    ...mapState('ideas', {
      ideasPagination: 'pagination'
    }),
    ...mapGetters('companies', {
      company: 'current'
    }),
    ...mapGetters('ideas', {
      ideas: 'list'
    }),
    ...mapGetters('users', {
      getUser: 'get',
      getFullName: 'fullName'
    }),
    breakpoint () {
      return this.$vuetify.breakpoint.xsOnly
    },
    user () {
      return this.getUser(this.userId)
    },
    ideasCount () {
      return get(this.ideasPagination, 'default.total', 0)
    }
  },
  watch: {},
  created () {},
  beforeRouteEnter (to, from, next) {
    store.dispatch('users/load', to.params.userId)
    next()
  },
  async beforeRouteLeave (to, from, next) {
    store.dispatch('users/unload')
    next()
  },
  methods: {
    ...mapActions('users', {
      loadUser: 'load',
      unloadUser: 'unload'
    })
  }
}
</script>

<style lang="stylus" scoped>
  .user-card {

  }
</style>
