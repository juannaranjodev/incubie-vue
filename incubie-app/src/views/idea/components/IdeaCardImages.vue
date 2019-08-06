<template>
  <div :class="{ 'idea-card-images--faded': faded }" class="idea-card-images">
    <i-light-box ref="lightbox" :images="value" />
    <v-card>
      <v-card-media :src="first.url" height="0" class="idea-card-images__primary" @click="openLightBox(0)"/>
    </v-card>

    <div class="idea-card-images__secondary">
      <a v-for="(image, i) in rest" :key="i" :style="{ backgroundImage: `url(${image.thumb})` }"
        class="idea-card-images__secondary-item" @click="openLightBox(i)" />
    </div>

  </div>
</template>

<script>
export default {
  name: "IdeaCardImages",
  components: {},
  props: {
    value: {
      type: Array,
      required: true,
      default: () => []
    },
    faded: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      first: {},
      rest: [],
      isLightBoxActive: false
    };
  },
  computed: {},
  watch: {
    value(newVal, oldVal) {
      if (newVal.length > 0) {
        this.first = newVal[0];
        this.rest = newVal.filter((v, i) => {
          return i > 0;
        });
      } else {
        this.first = {};
        this.rest = [];
      }
    }
  },
  created() {},
  mounted() {
    if (this.value.length > 0) {
      this.first = this.value[0];
      this.rest = this.value.filter((v, i) => {
        return i > 0;
      });
    }
  },
  methods: {
    openLightBox(i = 0) {
      this.$refs.lightbox.open(i);
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/stylus/settings/_variables.styl';

.idea-card-images {
  &__primary {
    cursor: pointer;
    padding-top: 100%;
  }

  &__secondary {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: $spacers.two.x;
    margin: $spacers.two.y 0;

    &-item {
      background-size: cover;
      height: 0;
      padding-top: 100%;
      width: 100%;
    }
  }

  &--faded {
    .idea-card-images {
      &__primary, &__secondary {
        filter: grayscale(100%);
      }
    }
  }
}
</style>
