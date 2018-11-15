<template>
  <v-flex xs12 sm8 lg6>
    <v-container
      small
      class="i-board">
      <v-card class="mb-5">
        <v-form ref="updateBoardForm" @submit.prevent="updateImage">
          <v-card-text>
            <v-layout wrap>
              <v-flex xs12>
                <div class="i-board__image">
                  <i-board-icon
                    :board="mutableBoard"
                    :size="155"/>
                  <v-btn
                    color="accent"
                    small
                    fab
                    class="i-board__image-edit"
                    @click.prevent="chooseImage">
                    <v-icon>edit</v-icon>
                  </v-btn>

                  <input
                    ref="imageFileInput"
                    type="file"
                    class="i-board__image-input"
                    @change="handleImageFile">
                </div>
              </v-flex>

              <v-flex xs12>
                <v-text-field
                  v-model="mutableBoard.name"
                  label="Name"
                  color="accent"
                  :rules="[$rules.required()]"/>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="mutableBoard.description"
                  label="Description"
                  color="accent"/>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="mutableBoard.createdDate"
                  label="Created At"
                  color="accent"/>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-card-actions
            class="justify-end">
            <v-btn
              :loading="isUpdatePending"
              type="submit"
              color="accent"
              flat>
              Update
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-container>
  </v-flex>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { get } from 'lodash'

export default {
  name: 'BoardUpdate',
  components: {},
  props: {},
  data () {
    return {
      tmpImage: null,
      mutableBoard: null,
      isUpdatePending: false
    }
  },
  computed: {
    ...mapGetters('auth', ['loggedInUser']),
    ...mapGetters('companies', {
      company: 'current'
    }),
    ...mapGetters('boards', {
      currentBoard: 'current'
    }),
    image () {
      return this.tmpImage || this.currentBoard.image;
    },
  },
  watch: {
    currentBoard: {
      immediate: true,
      handler (board) {
        this.mutableBoard = {
          name: board.name,
          description: board.description,
          createdDate: board.createdDate,
          image: board.image,
        }
      }
    }
  },
  created () {},
  methods: {
    ...mapActions('boards', {
      patchBoard: 'patch'
    }),
    ...mapMutations('snackbar', {
      showSnackbar: 'show'
    }),
    chooseImage () {
      this.$refs.imageFileInput.click()
    },
    async handleImageFile (e) {
      const file = get(e, 'currentTarget.files[0]')

      if (file) {
        const reader = new FileReader()
        reader.readAsDataURL(file)

        reader.onload = async e => {
          const data = e.target.result

          this.mutableBoard.image = data
        }
      }
    },
    async updateImage () {

      this.isUpdatePending = true
      const form = this.$refs.updateBoardForm;
        if (this.mutableBoard.image !== this.currentBoard.image) {
          const uploadRes = await this.$dispatchAction({
            type: this.$actionTypes.UPLOAD_IMAGES,
            payload: {
              uri: this.mutableBoard.image,
              bucket: `${this.company._id}/boards/${this.currentBoard._id}`,
              thumb: false
            },
            entity: this.company._id
          })

          this.mutableBoard.image = get(uploadRes, 'data.url');
        }
      if(form.validate()) {
        await this.patchBoard([this.currentBoard._id, this.mutableBoard]);
        this.showSnackbar({ message: 'Board details updated' });
        this.$router.push({name: "board/settings", params: {boardSlug: this.currentBoard.slug}});
      }else {
        this.showSnackbar({ message: 'Invalid validation', color:'error' });
      }

      this.isUpdatePending = false
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "~@/assets/stylus/settings/_variables"
  @import "~@/assets/stylus/settings/_colors"

  .i-board {

    &__image {
      display: inline-flex
      margin: $spacers.two.y 0 $spacers.four.y 0
      position: relative

      &:before {
        color: $grey.darken-1
        content: 'Image'
        font-size: 12px
        left: 0
        position: absolute
        top: -8px
      }

      &-edit {
        position: absolute
        right: 0
        top: 0
        transform: translate(25%, -25%)
      }

      &-input {
        display: none
      }
    }
  }
</style>
