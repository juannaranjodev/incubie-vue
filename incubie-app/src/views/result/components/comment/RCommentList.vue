<template>
    <div class="idea-comments">
        <template v-for="comment in items">
            <r-comment-item @edit="editComment" :key="comment._id" :item="comment" :light="light" />
        </template>
    </div>
</template>

<script>
    import {
        mapActions,
        mapGetters,
        mapMutations,
        mapState
    } from "vuex";
    import {
        clone,
        map,
        isNull
    } from "lodash";
    import RCommentItem from "./RCommentItem";


    export default {
        name: "ResultCommentList",
        components: {
            RCommentItem
        },
        props: {
            items: {
                type: Array,
                required: false,
                default: () => []
            },
            light: {
                type: String,
                required: false,
                default: () => ""
            }
        },
        data() {
            return {};
        },
        computed: {
            ...mapGetters("comments", {
                hasMoreComments: "hasMore",
                frozenRootComments: "frozenRoots"
            }),
            parentComments() {
                return this.items.filter(c => {
                    return isNull(c.parent)
                })
            }
        },
        watch: {},
        created() {},
        methods: {
            editComment({comment}){
                this.$emit('edit', {
                    comment: comment
                });
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
