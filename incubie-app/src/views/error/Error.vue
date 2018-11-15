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
          <v-flex xs12>
            <v-container class="pa-0">
              <v-layout wrap>
                <v-flex
                  class="text-xs-center"
                  xs12>
                  <div>
                    <img src="/images/incubie-logo.svg">
                  </div>
                </v-flex>

                <v-flex
                  xs12
                  class="text-xs-center">
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
  name: 'Error'
}
</script>
