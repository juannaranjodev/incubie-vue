<template>
  <div class="idea-list">
    <div class="idea-list__items">
      <template v-for="idea in frozenIdeas">
        <!-- ruby test add v-if , && idea.check > 0 -->
        <idea-list-item v-if="checkVisible(idea)"
          :key="idea._id"
          :idea="idea"/>
        <v-divider
          v-if="!breakpoint && checkVisible(idea)"
          :key="`${idea._id}-divider`"/>
      </template>

      <i-infinite-scroll :next="handleInfiniteScroll"/>
    </div>
    <!--<v-list
      two-line
      subheader
      class="idea-list pa-0">
      <template v-for="idea in frozenIdeas">
        <idea-list-item
          :key="idea._id"
          :idea="idea"/>
        <v-divider :key="`${idea._id}-divider`"/>
      </template>
    </v-list>

    <i-infinite-scroll :next="handleInfiniteScroll"/>

    <div class="list-items">
      <template v-for="idea in frozenIdeas">
        <idea-list-item
          :key="idea._id"
          :idea="idea"/>
        <v-divider :key="`${idea._id}-divider`"/>
      </template>
    </div>-->
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import InfiniteLoading from 'vue-infinite-loading'
import IdeaListItem from './IdeaListItem'
import { get } from 'lodash'// ruby test added

export default {
  name: 'IdeaList',
  components: {
    InfiniteLoading,
    IdeaListItem
  },
  props: {
    ideas: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  data () {
    return {
      frozenIdeas: []
    }
  },
  computed: {
    ...mapState('ideas', {
      isFindIdeasPending: 'isFindPending'
    }),
    ...mapGetters('ideas', {
      hasMoreIdeas: 'hasMore'
    }),
    breakpoint () {
      return this.$vuetify.breakpoint.xsOnly
    },
    // ruby test added <
    ...mapGetters("auth", ["loggedInUser"]),
    ...mapState('ideas', {
      ideasPagination: 'pagination'
    }),
    myIdeasCount () {
      return get(this.ideasPagination, 'default.total', 0)
    }
    // ruby test added >
  },
  watch: {
    ideas: {
      immediate: true,
      handler (ideas) {
        this.syncIdeas(ideas)
      }
    }
  },
  created () {},
  methods: {
    ...mapActions('ideas', {
      getNextIdeaPage: 'findNextPage'
    }),
    syncIdeas (ideas) {
      ideas.forEach(idea => {
        const found = this.frozenIdeas.find(frozenIdea => frozenIdea._id === idea._id)
        !found && this.frozenIdeas.push(idea)
      })
    },
    async handleInfiniteScroll () {
      await this.getNextIdeaPage()

      return this.hasMoreIdeas
    },
    // ruby test added <
    checkVisible(idea){
      if(idea.createdBy == this.loggedInUser._id ){
        return true;
      }
      if(idea.check > 0)
        return true;
      return false;
    }
    // ruby test added >
  }
}
</script>

<style lang="stylus" scoped>
  @import "~@/assets/stylus/settings/_variables"

  .idea-list {
    max-width: 865px
    transition: width 200ms $transition.fast-in-fast-out
    width: 100%
  }
</style>
