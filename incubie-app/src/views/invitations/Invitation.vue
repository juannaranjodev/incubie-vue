<template>
  <v-app>
    <v-content class="u__geometric-bg">
      <v-container
        class="pa-0"
        fluid
        fill-height>
        <v-layout
          align-center
          wrap>
          <v-flex
            xs12>
            <v-container
              class="pa-0"
              fluid>
              <v-layout
                wrap>
                <v-flex
                  xs12
                  class="text-xs-center">
                  <img src="/images/incubie-logo.svg">
                </v-flex>
                <v-flex
                  xs12
                  class="u__mobile-container">
                  <router-view/>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'Invitation',
  components: {},
  props: {
    id: {
      type: String,
      required: true,
      default: null
    }
  },
  data () {
    return {}
  },
  computed: {},
  created () {},
  methods: {}
}
</script>
