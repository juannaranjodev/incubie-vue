<template>
  <v-avatar
    v-if="company.logo"
    :size="size">
    <img
      :src="company.logo">
  </v-avatar>
  <v-avatar
    v-else
    :size="size"
    color="accent">
    <span class="i-company-icon__letter">{{ company.name.substr(0, 1) }}</span>
  </v-avatar>
</template>

<script>
export default {
  name: 'ICompanyIcon',
  components: {},
  props: {
    company: {
      type: Object,
      required: true
    },
    size: {
      type: Number,
      required: false,
      default: 32
    }
  },
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  methods: {}
}
</script>

<style lang="stylus">
  @import '~@/assets/stylus/settings/_variables'
  @import '~@/assets/stylus/settings/_colors'

  .i-company-icon {

    &__letter {
      color: $theme.accentLighter
      font-size: 24px
      transform: translateY(1px)
    }
  }
</style>
