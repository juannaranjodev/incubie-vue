<template>
  <v-form
    ref="loginForm"
    @submit.prevent="login()">
    <v-card
      v-if="user"
      class="auth__card">
      <v-card-title>
        <h3 class="title">Re-enter your password to continue:</h3>
      </v-card-title>

      <v-card-text>
        <v-text-field
          v-model="password"
          :validate-on-blur="true"
          :rules="[$rules.required()]"
          type="password"
          label="Password"/>
      </v-card-text>

      <v-card-actions>
        <v-btn
          :loading="isAuthenticatePending"
          type="submit"
          color="accent"
          large>
          <v-icon left>lock</v-icon>
          Continue
        </v-btn>
      </v-card-actions>
    </v-card>

    <v-card
      v-else
      class="auth__card">
      asdf
    </v-card>
  </v-form>
</template>

<script>
import store from '@/store'
import { mapGetters, mapState } from 'vuex'
import { get } from 'lodash'

export default {
  name: 'LoginByCompany',
  components: {},
  props: {},
  data () {
    return {
      password: null,
      email: null,
      strategy: 'local'
    }
  },
  computed: {
    ...mapState('auth', ['isAuthenticatePending', 'errorOnAuthenticate']),
    ...mapGetters('auth', ['loggedInUser']),
    form () {
      return {
        email: this.loggedInUser.email || this.email,
        password: this.password,
        strategy: this.strategy
      }
    }
  },
  watch: {},
  beforeRouteEnter (to, from, next) {
    const user = get(store.state, 'auth.user')

    if (user) {
      next()
    } else {
      const slug = get(store.state, 'params.slug')
      to({ name: 'login', params: { slug: slug } })
    }
  },
  created () {},
  methods: {}
}
</script>
