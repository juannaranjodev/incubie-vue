<template>
  <div class="i-user">
    <v-avatar
      v-if="user.avatar"
      :size="size"
      :class="{ 'mr-1': small, 'mr-2': !small || large }"
      class="i-user__avatar">
      <img :src="user.avatar">
    </v-avatar>
    <div
      :style="{ fontSize: fontSize + 'px' }"
      :class="{ 'i-user__body--muted': muted }"
      class="i-user__body">
      <router-link
        :to="{ name: 'user/main', params: { userId: user._id } }"
        class="i-user__name u__underline-on-hover mr-1">{{ fullName(user) }}</router-link>
      <span
        v-if="showScore"
        class="i_user__voteCount">({{ user.voteCount | formatNumber }})</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import numeral from 'numeral'

export default {
  name: 'IUser',
  components: {},
  props: {
    user: {
      type: Object,
      required: true,
      default: () => {}
    },
    showScore: {
      type: Boolean,
      default: true
    },
    small: {
      type: Boolean,
      default: false
    },
    large: {
      type: Boolean,
      default: false
    },
    muted: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {}
  },
  computed: {
    ...mapGetters('users', ['fullName']),
    fontSize () {
      if (this.small) {
        return 12
      } else if (this.large) {
        return 16
      } else {
        return 14
      }
    },
    size () {
      if (this.small) {
        return 20
      } else if (this.large) {
        return 32
      } else {
        return 24
      }
    }
  },
  watch: {},
  created () {},
  methods: {}
}
</script>

<style lang="stylus">
  @import "~@/assets/stylus/settings/_colors"

  .i-user {
    align-items: center
    display: flex

    &__body {
      transform: translateY(8%)

      &--muted {
        color: rgba(0,0,0,0.54)

        a {
          color: rgba(0,0,0,0.54)
        }
      }
    }
  }
</style>
