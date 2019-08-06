<template>
  <div><slot v-if="state === 1"/></div>
</template>

<script>
export default {
  name: 'IInfiniteScroll',
  components: {},
  props: {
    next: {
      type: Function,
      required: true
    },
    distance: {
      type: Number,
      required: false,
      default: 100
    }
  },
  data () {
    return {
      state: 0
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {
    window.addEventListener('scroll', this.onScroll)
    // window.onscroll = this.onScroll
  },
  methods: {
    reset () {
      this.state = 0
    },
    async onScroll () {
      let bottomOfWindow = (document.documentElement.scrollTop + window.innerHeight + this.distance) >= document.documentElement.offsetHeight

      if (bottomOfWindow && this.state === 0) {
        this.state = -1
        const res = await this.next()
        this.state = !res ? 1 : 0
      }
    }
  }
}
</script>
