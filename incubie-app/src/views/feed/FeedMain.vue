<template>
  <div>
    <idea-create-dialog/>

    <v-btn
      :disabled="!boards.length"
      :to="{ name: 'feed/main', params: { createIdea: 'create' } }"
      color="primary"
      dark
      fab
      large
      fixed
      bottom
      right>
      <v-icon>lightbulb_outline</v-icon>
    </v-btn>

    <v-container
      v-if="!ideas.length && !isFindPending"
      fill-height
      fluid
      class="u__main-container">
      <v-layout
        align-center>
        <div class="u__empty-message">
          <h1
            :class="{ 'headline': breakpoint, 'display-1': !breakpoint }"
            class="mb-4">
            Welcome to Your Home Board!
          </h1>
          <p
            :class="{ 'subheading': breakpoint, 'headline': !breakpoint }"
            v-html="welcomeMessage"/>
        </div>
      </v-layout>
    </v-container>

    <i-container
      v-else
      class="u__main-container">
      <v-layout wrap>
        <v-flex xs12>
          <idea-list
            v-if="ideas.length"
            :ideas="ideas"/>
        </v-flex>
      </v-layout>
    </i-container>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
import InfiniteLoading from 'vue-infinite-loading'
import IdeaList from '@/views/idea/components/IdeaList'
import IdeaCreateDialog from '@/views/idea/components/IdeaCreateDialog'
import store from '@/store'

export default {
  name: 'FeedMain',
  components: {
    InfiniteLoading,
    IdeaCreateDialog,
    IdeaList
  },
  props: {
    createIdea: {
      type: String,
      required: false,
      default: ''
    }
  },
  data () {
    return {}
  },
  computed: {
    ...mapState('ui', ['isCreateIdeaDialogOpen']),
    ...mapState('ideas', {
      isFindPending: 'isFindPending',
      ideaIds: 'ids',
      ideasPagination: 'pagination'
    }),
    ...mapGetters('companies', {
      company: 'current'
    }),
    ...mapGetters('boards', {
      boards: 'list'
    }),
    ...mapGetters('ideas', {
      hasMoreIdeas: 'hasMore',
      ideas: 'list'
    }),
    breakpoint () {
      return this.$vuetify.breakpoint.xsOnly
    },
    welcomeMessage () {
      const cta = this.boards.length ? 'Post the first ground-breaking idea now!' : 'But first, we need to create a new board.'
      return `This is where ideas from all of your boards will collect.<br>${cta}`
    }
  },
  watch: {
    createIdea: {
      immediate: true,
      handler (createIdea) {
        if (createIdea) {
          this.setCreateIdeaDialogOpen()
        } else {
          this.setCreateIdeaDialogOpen(false)
        }
      }
    },
    isCreateIdeaDialogOpen (isOpen) {
      if (!isOpen) {
        this.$router.push({ name: 'feed/main' })
      }
    }
  },
  created () {},
  beforeRouteEnter (to, from, next) {
    store.dispatch('feed/load')
    next()
  },
  methods: {
    ...mapMutations('ui', ['setCreateIdeaDialogOpen']),
    ...mapActions('ideas', {
      getIdeas: 'find',
      getNextIdeaPage: 'findNextPage',
      findIdeasBySort: 'findBySort'
    })
  }
}
</script>
