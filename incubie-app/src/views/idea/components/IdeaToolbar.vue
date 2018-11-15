<template>
  <v-toolbar
    dark
    color="secondary lighten-1"
    class="toolbar hidden-xs-only actions"
    flat>
    <!-- <v-toolbar-title
      class="subheading">
      {{ board.name }}
    </v-toolbar-title> -->
    <v-layout
      justify-end
      row>
      <v-radio-group
        v-model="commentsSortBy"
        row
        hide-details
        class="u__sort-by-group">
        <v-radio
          v-for="sortByType in sortByOptions"
          :key="sortByType.value"
          :label="sortByType.label"
          :value="sortByType.value"
          @change="loadComments"/>
      </v-radio-group>
    </v-layout>
    <v-spacer/>
  </v-toolbar>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'

export default {
  name: 'IdeaToolbar',
  components: {},
  props: {},
  data () {
    return {}
  },
  computed: {
    ...mapState('ui', ['sortCommentsBy']),
    ...mapGetters('ui', ['sortByOptions']),
    //  mapGetters('boards', {
    //  board: 'current'
    // }),
    commentsSortBy: {
      get () {
        return this.sortCommentsBy
      },
      set (v) {
        this.setSortCommentsBy(v)
      }
    }
  },
  watch: {},
  created () {},
  methods: {
    ...mapMutations('ui', ['setSortCommentsBy']),
    ...mapMutations('comments', {
      clearComments: 'clearList',
      resetCommentsPage: 'resetPage'
    }),
    ...mapActions('comments', 'boards', {
      loadComments: 'load',
      loadBoard: 'load',
      findNextCommentsPage: 'findNextPage'
    })
  }
}
</script>
