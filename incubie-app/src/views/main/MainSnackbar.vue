<template>
  <v-snackbar
    :value="isSnackbarVisible"
    :timeout="timeout"
    :color="color"
    :vertical="$vuetify.breakpoint.smAndDown"
    top
    absolute
    @input="dismiss">
    <strong>{{ message }}</strong>
    <v-btn
      color="white"
      flat
      @click="dismiss">
      Close
    </v-btn>
  </v-snackbar>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  name: 'MainSnackbar',
  components: {},
  props: {},
  data () {
    return {}
  },
  computed: {
    ...mapState('snackbar', ['timeout', 'message', 'color', 'isSnackbarVisible'])
  },
  watch: {},
  created () {},
  methods: {
    ...mapMutations('snackbar', ['show', 'dismiss'])
  }
}
</script>
