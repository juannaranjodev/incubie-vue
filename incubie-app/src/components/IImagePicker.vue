<template>
  <div class="input-group i-image-picker">
    <label>Images</label>
    <v-btn small fab color="accent" absolute right class="i-image-picker__fab" @click.prevent="chooseImages">
      <v-icon>add</v-icon>
    </v-btn>
    <hr>
    <v-container fluid grid-list-md mt-3 pa-0>
      <v-layout wrap>
        <v-flex v-for="(image, index) in value" :key="`image-${index}`" xs3 @mouseover="mouseoverIndex = index"
          @mouseout="mouseoverIndex = null">
          <v-card tile class="i-image-picker__image-card">
            <v-card-media v-if="image.loaded || image.thumb" :src="image.data || image.thumb"
              class="i-image-picker__image" />
            <div v-if="image.loading" class="i-image-picker__uploading">
              <v-progress-circular :size="24" :width="2" color="accent" indeterminate/>
            </div>
            <v-card-actions class="text-xs-center">
              <v-btn v-if="image.loaded || image.thumb" flat small block color="grey" class="i-image-picker__remove-image-btn"
                @click="removeImage(index)">
                remove
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <input ref="fileInput" type="file" multiple class="i-image-picker__file-input" @change="handleImageFiles">
  </div>
</template>

<script>
export default {
  name: "IImagePicker",
  components: {},
  props: {
    value: {
      type: Array,
      required: true
    },
    loading: {
      type: Boolean,
      default: false,
      required: false
    },
    upload: {
      type: Function,
      default: null,
      required: false
    }
  },
  data() {
    return {
      imageList: [],
      mouseoverIndex: null
    };
  },
  computed: {},
  watch: {
    value: {
      handler(value) {
        const hasLoading = value.some(image => {
          return !(image.loaded || image.thumb) || image.loading;
        });

        this.$emit("update:loading", hasLoading);
      }
    }
  },
  created() {},
  methods: {
    chooseImages() {
      this.$refs.fileInput.click();
    },
    handleImageFiles(e) {
      const files = e.currentTarget.files;

      Object.keys(files).forEach(key => {
        this.addImage(files[key]);
      });
    },
    addImage(file) {
      const reader = new FileReader();
      const image = {
        name: file.name,
        loaded: false,
        loading: true
      };
      reader.readAsDataURL(file);

      reader.onload = this.onImageLoad(image);
    },
    onImageLoad(image) {
      return async e => {
        const data = e.target.result;
        image.loaded = true;
        image.loading = false;
        image.data = data;

        this.value.push(image);
      };
    },
    removeImage(index) {
      this.value.splice(index, 1);
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/stylus/settings/_variables';

.i-image-picker {
  flex-direction: column;

  &__fab {
    transform: translateY(10px);
  }

  &__file-input {
    display: none;
  }

  &__loading {
    align-items: center;
    background: #e0e0e0;
    display: flex;
    height: 92px;
    justify-content: center;
    width: 100%;
  }

  &__uploading {
    align-items: center;
    background: rgba(234, 234, 234, 0.8);
    display: flex;
    height: 92px;
    justify-content: center;
    position: absolute;
    top: 0;
    width: 100%;
  }

  &__image {
    height: 0;
    padding-top: 100%;
  }

  &__remove-image-btn {
    margin: auto;
  }
}
</style>
