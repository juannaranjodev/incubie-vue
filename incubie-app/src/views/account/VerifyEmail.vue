<template>
  <v-app class="auth">
    <v-content class="u__geometric-bg u__geometric-bg--dark">
      <v-container
        class="pa-0"
        fluid
        fill-height>
        <v-layout
          align-center
          justify-center
          wrap>
          <v-flex xs12>
            <v-card class="u__mobile-container">
              <v-card-title primary-title>
                <h3 class="headline">Verifying Email</h3>
              </v-card-title>
              <v-card-text class="text-xs-left">
                <v-alert
                  :value="error"
                  type="error">
                  {{ error }}
                </v-alert>

                <v-alert
                  :value="!error"
                  type="info">
                  {{ message }}
                </v-alert>
              </v-card-text>
              <v-card-actions v-if="!isActionPending">
                <v-btn
                  :to="{ name: 'root' }"
                  block
                  color="accent">
                  Continue
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import { get } from 'lodash'

export default {
  name: 'VerifyEmail',
  components: {},
  props: {
    token: {
      type: String,
      required: true,
      default: null
    }
  },
  data () {
    return {
      message: 'Verifying...'
    }
  },
  computed: {
    ...mapState('actions', ['isActionPending', 'errorOnAction']),
    error () {
      return get(this.errorOnAction, 'message')
    }
  },
  watch: {},
  async created () {
    await this.$dispatchAction({
      type: this.$actionTypes.VERIFY_EMAIL,
      payload: this.token
    })

    this.message = 'Email verified successfully!'
  },
  methods: {}
}
</script>
