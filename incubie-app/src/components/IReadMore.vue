<template>
  <div>
    <span v-html="formattedText"/>
    <button
      v-if="!isReadMore && text.length > maxChars"
      title="Click to read more"
      class="read-more"
      @click="isReadMore = true">
      [&hellip;]
    </button>
  </div>
</template>

<script>
export default {
  name: 'IReadMore',
  components: {},
  props: {
    text: {
      type: String,
      required: true,
      default: () => ''
    },
    maxChars: {
      type: Number,
      required: false,
      default: 168
    }
  },
  data () {
    return {
      isReadMore: false
    }
  },
  computed: {
    formattedText () {
      return this.isReadMore ? this.text : this.text.substr(0, this.maxChars)
    }
  },
  watch: {},
  created () {},
  methods: {}
}
</script>

<style lang="stylus" scoped>
  @import "~@/assets/stylus/settings/_colors.styl"
  @import "~@/assets/stylus/settings/_variables.styl"

  .read-more {
    font-weight: bold
    padding-left: $spacers.one.x
  }
</style>
