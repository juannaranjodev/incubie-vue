<template>
  <i-loading/>
</template>

<script>
export default {
  name: 'Load',
  components: {},
  props: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {
    this.$nextTick(this.$router.push({ name: 'feed/main' }))
  },
  methods: {}
}
</script>
