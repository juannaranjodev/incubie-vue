<template>
  <div
    fluid
    pa-0
    class="idea__meta">
    <i-user
      :user="createdBy"
      muted/>
    <div class="idea__meta__comments px-3 u__truncate">
      {{ idea.commentCount }} Comments
    </div>
    <div class="idea__meta__info u__truncate">
      {{ idea.createdAt | formatDateFromNow }} <span v-if="board"> in {{ idea.board.name }}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'IdeaMeta',
  components: {},
  props: {
    idea: {
      type: Object,
      required: true,
      default: () => {}
    },
    board: {
      type: Boolean,
      required: false,
      default: false
    },
    justifySpaceBetween: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {}
  },
  computed: {
    ...mapGetters('users', {
      getUser: 'get'
    }),
    createdBy () {
      return this.getUser(this.idea.createdBy)
    }
  },
  watch: {},
  created () {},
  methods: {}
}
</script>

<style lang="stylus">
  @import "~@/assets/stylus/settings/_variables"

  .idea__meta {
    align-items: center
    display: flex
  }
</style>
