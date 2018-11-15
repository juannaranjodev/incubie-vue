<template>
  <v-toolbar
    dark
    color="secondary"
    class="account-toolbar">
    <v-toolbar-items>
      <v-btn
        :to="{ name: 'account/profile' }"
        exact
        flat
        ripple>Profile
      </v-btn>
      <v-btn
        :to="{ name: 'account/password' }"
        exact
        flat
        ripple>Password
      </v-btn>
      <v-btn
        :to="{ name: 'account/notifications' }"
        exact
        flat
        ripple>Notifications
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  name: 'AccountToolbar',
  components: {},
  props: {},
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
  .account-toolbar {

    .v-toolbar__content {
      // padding: 0
    }
  }
</style>
