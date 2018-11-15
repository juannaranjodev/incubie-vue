<template>
  <div
    :class="classList"
    class="i-vote">
    <!-- ruby test add v-if, v-else -->
    <span v-if="!showDot" class="i-vote__count">{{ entity.voteCount | formatNumber }} </span>
    <div v-else class="i-vote__circle"></div>
    <v-btn
      :disabled="disabled || isVotePending"
      flat
      class="i-vote__btn"
      @click.prevent="doVote">
      <v-icon
        :size="arrowSize"
        class="i-vote__icon">
        keyboard_arrow_up
      </v-icon>
    </v-btn>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import { voteKinds } from '@/constants'

export default {
  name: 'IVote',
  components: {},
  props: {
    parent: {
      type: String,
      required: true,
      default: () => {}
    },
    kind: {
      type: String,
      required: true,
      default: null,
      validator (val) {
        return Object.keys(voteKinds).map(kind => voteKinds[kind]).includes(val)
      }
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    small: {
      type: Boolean,
      required: false,
      default: false
    },
    medium: {
      type: Boolean,
      required: false,
      default: true
    },
    large: {
      type: Boolean,
      required: false,
      default: false
    },
    // ruby test <
    showDot: {
      type: Boolean,
      required: false,
      default: true,
    }
    // ruby test >
  },
  data () {
    return {
      active: false
    }
  },
  computed: {
    ...mapState('votes', ['isVotePending']),
    ...mapGetters('auth', ['loggedInUser']),
    ...mapGetters('votes', ['hasVoted']),
    entity () {
      return this.$store.getters[`${this.kind}/get`](this.parent)
    },
    value () {
      return {
        parent: this.entity._id,
        kind: this.kind,
        owner: this.entity.createdBy,
        voter: this.loggedInUser._id
      }
    },
    classList () {
      return {
        'i-vote--active': this.active,
        'i-vote--medium': this.medium && !this.small && !this.large,
        'i-vote--small': this.small,
        'i-vote--large': this.large
      }
    },
    arrowSize () {
      if (this.large) {
        return 44
      } else if (this.medium) {
        return 32
      } else {
        return 16
      }
    }
  },
  watch: {},
  created () {
    this.active = this.hasVoted(this.loggedInUser._id, this.entity)
  },
  methods: {
    ...mapActions('votes', {
      vote: 'create',
      unvote: 'remove'
    }),
    async doVote () {
      if (this.active) {
        await this.unvote(this.value)
        this.active = false
      } else {
        await this.vote(this.value)
        this.active = true
      }
    }
  }
}
</script>

<style lang="stylus">
  @import "~@/assets/stylus/settings/_variables"
  @import "~@/assets/stylus/settings/_colors"

  .i-vote {
    align-items: center
    display: flex
    flex-direction: column-reverse
    justify-content: center

    // ruby test <
    &__circle {
      border-radius: 50%
      display: block
      height: 9px
      // position: absolute
      // left: $spacers.two.x
      // top: $spacers.two.y
      width: 9px
      background-color: $theme.closed
    }  
    // ruby test >

    &__icon,
    &__count {
      color: $grey.base !important
    }

    &--large,
    &--medium,
    &--small {
      .i-vote {

        &__btn {
          margin: 0
          min-width: auto
          padding: 0
        }
      }
    }

    &--active {

      .i-vote {

        &__icon,
        &__count {
          color: $theme.accentDark !important
        }
      }
    }

    &--small {

      .i-vote {

        &__count {
          font-size: 14px
          line-height: 14px
        }

        &__btn {
          height: 18px
        }

        &__icon {
          width: 18px
        }
      }
    }

    &--medium {

      .i-vote {

        &__count {
          font-size: 18px
          line-height: 18px
        }

        &__btn {
          height: 22px
        }

        &__icon {
          width: 22px
        }
      }
    }

    &--large {

      .i-vote {

        &__count {
          font-size: 24px
          line-height: 24px
        }

        &__btn {
          height: 28px
        }

        &__icon {
          width: 28px
        }
      }
    }
  }
</style>
