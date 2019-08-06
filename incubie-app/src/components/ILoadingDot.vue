<template>
  <div class="spinner"/>
</template>

<script>
export default {
  name: 'ILoadingDot',
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

<style lang="stylus" scoped>
  .spinner {
    animation: sk-scaleout 1.0s infinite ease-in-out
    background-color: #333
    border-radius: 100%
    height: 40px
    margin: 100px auto
    width: 40px
  }

  @keyframes sk-scaleout {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1.0);
      opacity: 0;
    }
  }
</style>
