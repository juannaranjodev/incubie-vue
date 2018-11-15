<template>
  <v-form
    ref="loginForm"
    @submit.prevent="login()">
    <v-card class="auth__card">
      <v-alert
        :value="authenticateError"
        class="mb-2"
        type="error">
        {{ authenticateError }}
      </v-alert>

      <v-card-title
        v-if="user"
        class="auth__title pt-4">
        <span class="subheading">
          To continue, first verify it's you
        </span>
      </v-card-title>
      <v-card-text>
        <v-btn
          class="btn__social"
          disabled
          large
          block
          @click.prevent="launchGoogleSignIn">
          <i>
            <img src="/images/icons/google.svg">
          </i>
          Log In with Google
        </v-btn>

        <!--
        <v-btn
          class="btn__social"
          large
          disabled>
          <i>
            <img src="/images/icons/linkedin.svg">
          </i>
          Log In with Linked In
        </v-btn>

        <v-btn
          class="btn__social"
          large
          disabled>
          <i>
            <img src="/images/icons/facebook.svg">
          </i>
          Log In with Facebook
        </v-btn>
        -->

        <div class="auth__divider">
          <span/>
          <span>or</span>
          <span/>
        </div>
      </v-card-text>

      <v-card-text class="py-0">
        <i-user
          v-if="user"
          :user="user"
          :size="30"
          :show-score="false"
          class="mb-3"/>
        <v-text-field
          v-else
          v-model="email"
          :validate-on-blur="true"
          :rules="[$rules.required(), $rules.email()]"
          autofocus
          type="email"
          label="Email"/>
        <v-text-field
          ref="password"
          v-model="password"
          :validate-on-blur="true"
          :rules="[$rules.required()]"
          type="password"
          label="Enter your password"/>
      </v-card-text>
      <v-card-actions>
        <v-btn
          :loading="isAuthenticatePending"
          type="submit"
          color="accent"
          large
          block>
          <span v-if="user">Continue</span>
          <span v-else>Log In</span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import { get } from 'lodash'
import { paramsForServer } from 'feathers-hooks-common'

export default {
  name: 'Login',
  components: {},
  props: {
    slug: {
      type: String,
      required: false,
      default: null
    },
    userId: {
      type: String,
      required: false,
      default: null
    }
  },
  data () {
    return {
      user: null,
      email: null,
      password: null,
      strategy: 'local'
    }
  },
  computed: {
    ...mapState('auth', ['isAuthenticatePending', 'errorOnAuthenticate']),
    form () {
      return {
        id: get(this.user, '_id'),
        email: get(this.user, 'email') || this.email,
        password: this.password,
        strategy: this.strategy,
        slug: this.slug
      }
    },
    authenticateError () {
      return this.errorOnAuthenticate ? this.errorOnAuthenticate.error : null
    }
  },
  watch: {},
  async mounted () {
    await this.$store.dispatch('auth/clearAll')
    await this.$store.dispatch('auth/logout')

    const userId = this.userId

    if (userId) {
      const user = await this.$store.dispatch('users/get', [userId, paramsForServer({
        action: 'getPublicProfile'
      })])

      this.user = user
      this.$refs.password.focus()
    }
  },
  created () {},
  async destroyed () {
    await this.clearAuthenticateError()
  },
  methods: {
    ...mapMutations('auth', [
      'clearAuthenticateError',
      'setAuthenticatePending',
      'setAuthenticateError',
      'unsetAuthenticatePending'
    ]),
    ...mapActions('auth', [
      'authenticate',
      'logout'
    ]),
    async login () {
      await this.clearAuthenticateError();

      if (this.$refs.loginForm.validate()) {
        this.setAuthenticatePending(true);

        try {
          let redirect;
          await this.authenticate(this.form);

          if (this.slug) {
            redirect = { name: 'feed/main', params: { slug: this.slug } }
            await this.$store.dispatch("worker/subscribe");
          } else {
            redirect = get(this.$route, 'query.redirect') || { name: 'root' }
          }

            console.log("redirect: ", redirect);

          this.$router.push(redirect)
        } catch (err) {
          const errCode = get(err, 'code')
          const errMessage = get(err, 'data.message', 'error')
          console.dir(err)
          if (errCode === 403) {
            this.$router.push({ name: 'unauthorized' })
          } else {
            await this.setAuthenticateError({ error: errMessage })
          }
        }

        this.unsetAuthenticatePending()
      }
    }
  }
}
</script>
