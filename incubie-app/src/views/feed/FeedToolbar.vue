<template>
  <v-toolbar
    dark
    flat
    color="secondary lighten-1"
    class="actions">
    <v-toolbar-title
      class="title hidden-xs-only">
      Home
    </v-toolbar-title>
    <v-radio-group
      v-model="feedSortBy"
      row
      hide-details
      class="u__sort-by-group">
      <v-divider
        class="mx-3"
        vertical/>
      <v-layout
        justify-end
        row>
        <v-radio
          v-for="sortByType in sortByOptions"
          :key="sortByType.value"
          :label="sortByType.label"
          :value="sortByType.value"
          @change="loadFeed"/>
      </v-layout>
    </v-radio-group>
  </v-toolbar>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'

export default {
  name: 'FeedToolbar',
  components: {},
  props: {},
  data () {
    return {}
  },
  computed: {
    ...mapState('ui', ['sortIdeasBy']),
    ...mapGetters('ui', ['sortByOptions'], 'boards', {
      board: 'current'
    }),
    feedSortBy: {
      get () {
        return this.sortIdeasBy
      },
      set (v) {
        this.setSortIdeasBy(v)
      }
    }
  },
  watch: {},
  created () {},
  methods: {
    ...mapMutations('ui', ['setSortIdeasBy']),
    ...mapActions('feed', {
      loadFeed: 'load'
    })
  }
}
</script>
