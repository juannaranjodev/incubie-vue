<template>
  <v-avatar
    :size="size"
    :color="color"
    class="i-user-icon">
    <img
      v-if="user.avatar"
      :src="user.avatar"
      :alt="`${user.firstName} ${user.lastName}`">
    <v-icon
      v-else
      :size="size"
      color="white"
      class="i-user-icon__default">account_circle</v-icon>
  </v-avatar>
</template>

<script>
export default {
  name: 'IUserIcon',
  components: {},
  props: {
    user: {
      type: Object,
      required: true
    },
    size: {
      type: Number,
      required: false,
      default: 44
    },
    dark: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: 'grey'
    }
  },
  computed: {},
  watch: {},
  methods: {}
}
</script>

<style lang="stylus" scoped>
  @import "~@/assets/stylus/settings/_colors"

  .i-user-icon {

    & &__default {
      cursor: pointer
    }
  }
</style>
