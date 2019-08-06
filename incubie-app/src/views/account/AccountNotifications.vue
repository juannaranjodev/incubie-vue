<template>
  <i-container
    small
    class="i-account">
    <v-card class="mb-5">
      <v-form @submit.prevent="updateProfile">
        <v-card-text>
          <h2>We'll email you when:</h2>
          <v-list-tile>
            <v-list-tile-content >Someone posts an idea.</v-list-tile-content>
            <v-list-tile-action>
              <v-switch class="pl-4"
              color="indigo"
              label=""/>
            </v-list-tile-action>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content >Someone replies to my pitch.</v-list-tile-content>
            <v-list-tile-action>
              <v-switch class="pl-4"
              color="indigo"
              label=""/>
            </v-list-tile-action>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content >Someone votes to on pitch.</v-list-tile-content>
            <v-list-tile-action>
              <v-switch class="pl-4"
              color="indigo"
              label=""/>
            </v-list-tile-action>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content >Someone votes on my comment.</v-list-tile-content>
            <v-list-tile-action>
              <v-switch class="pl-4"
              color="indigo"
              label=""/>
            </v-list-tile-action>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content >Someone comments on my comment.</v-list-tile-content>
            <v-list-tile-action>
              <v-switch class="pl-4"
              color="indigo"
              label=""/>
            </v-list-tile-action>
          </v-list-tile>
        </v-card-text>
      </v-form>
    </v-card>
  </i-container>
</template>

<script>
import { mapGetters, mapMutations, mapState, mapActions } from 'vuex';
export default {
  name: 'AccountNotifications',
  components: {},
  props: {},
  data () {
    return {}
  },
  computed: {
    ...mapGetters('users',{
      user:'current',
    }),
  },
  watch: {},
  created () {},
  methods: {
    
  }
}
</script>
