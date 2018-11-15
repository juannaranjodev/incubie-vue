<template>
  <router-view class="u__fill-height"/>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Board',
  components: {},
  props: {},
  data () {
    return {}
  },
  computed: {
    ...mapGetters('boards', {
      board: 'current',
      getBoards: 'find'
    })
  },
  created () {},
  methods: {
    ...mapMutations('boards', ['setCurrent', 'clearCurrent', 'setCurrentBySlug'])
  }
}
</script>
