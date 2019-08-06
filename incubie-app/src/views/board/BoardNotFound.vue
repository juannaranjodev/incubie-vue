<template>
  <v-card light>
    <v-alert
      value="true"
      class="mb-4"
      type="error">
      404 Not Found
    </v-alert>
    <v-card-text>
      This board does not exist.
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'BoardNotFound',
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
