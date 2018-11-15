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
            <i-loading/>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'Logout',
  async mounted () {
    await this.$store.dispatch('auth/clearAll')
    await this.$store.dispatch('auth/logout')

    this.$nextTick(() => {
      this.$router.push({ name: 'login' })
    })
    // setTimeout(() => {
    //   this.$nextTick(() => {
    //     this.$router.push({ name: 'login' })
    //   })
    // }, 2000)
  }
}
</script>
