<template>
  <div>
    <div class="idea-comments">
      <idea-comment  @edit="editComment" v-for="comment in parentComments"
        :key="comment._id" :comment="comment" />
    </div>
    <i-infinite-scroll v-if="frozenRootComments.length" ref="infiniteScroll" :next="handleInfiniteScroll"/>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import IdeaComment from "./IdeaComment";
import { clone, map, isNull } from "lodash";

export default {
  name: "IdeaComments",
  components: {
    IdeaComment
  },
  props: {
    comments: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  data() {
    return {};
  },
  computed: {
    
    ...mapState("comments", {
      frozenComments: "frozen"
    }),
    ...mapGetters("comments", {
      hasMoreComments: "hasMore",
      frozenRootComments: "frozenRoots"
    }),
    parentComments(){
        return this.comments.filter(c => {
          return isNull(c.parent)
        })
    }
  },
  watch: {
    // comments: {
    //   immediate: true,
    //   handler(comments) {
    //     this.addFrozenComments(comments);
    //   }
    // }
  },
  created() {},
  methods: {
    // ...mapMutations("comments", {
    //   addFrozenComments: "addFrozenItems"
    // }),
    ...mapActions("comments", {
      findNextCommentsPage: "findNextPage"
    }),
    editComment({comment}){
      this.$emit('edit', {comment: comment})
    },
    async handleInfiniteScroll() {
      await this.findNextCommentsPage();

      return this.hasMoreComments;
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/stylus/settings/_variables';

.idea-comments {
  margin-top: $spacers.three.y;
}

.idea-comment {
  margin: 0 0 $spacers.three.y 0;
}
</style>
