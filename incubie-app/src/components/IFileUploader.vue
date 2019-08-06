<template>
  <div class="i-file-uploader">
    <div @click="chooseFiles">
      <slot name="trigger"/>
    </div>

    <input
      ref="fileInput"
      :multiple="multiple"
      type="file"
      class="i-file-uploader__input">
  </div>
</template>

<script>
export default {
  name: 'IFileUploader',
  components: {},
  props: {
    multiple: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  methods: {
    chooseFiles () {
      this.$refs.fileInput.click()
    }
  }
}
</script>

<style lang="stylus" scoped>
  .i-file-uploader {

    &__input {
      display: none
    }
  }
</style>
