<template>
    <v-card :class="{ 'idea-comment--child': item.parent || false }" :name="item._id" flat class="idea-comment comment-list-item">
        <v-container pa-0>
            <v-layout>
                <div class="idea-comment__margin">
                    <i-vote :parent="item._id" :kind="$constants.voteKinds.comments" small class="mr-2" />

                    <!--<button v-if="replies.length" class="idea-comment__collapse" @click="toggleCollapse">-->
                        <!--<span/>-->
                    <!--</button>-->
                </div>

                <div class="idea-comment__main comment-list-item__main">
                    <div class="idea-comment__header comment-list-item__header">
                        <i-user :user="author" small />

                        <div class="idea-comment__date">
                            {{ item.createdAt | formatDateFromNow }}
                        </div>

                        <div class="idea-comment__idea-title comment-list-item__idea">
                            <span>In</span>
                            <router-link class="comment-list-item__idea-title" :to="{name: 'idea', params: {idea: idea._id}}">
                                {{idea.title}}
                            </router-link>
                        </div>
                    </div>

                    <div class="idea-comment__text" v-html="textBackLight(item.text, light)"></div>

                    <div v-if="idea.status !== $constants.ideaStatuses.closed" class="idea-comment__footer">
                        <!--<v-btn flat small class="idea-comment__footer-btn" @click.prevent="toggleDoReply">-->
                            <!--<v-icon :size="14" color="grey">-->
                                <!--mode_comment-->
                            <!--</v-icon>-->
                                <!--&lt;!&ndash;&ndash;&gt;-->
                            <!--<span>Reply</span>-->
                        <!--</v-btn>-->

                        <!--<v-btn v-if="isAuthor" flat small class="idea-comment__footer-btn" @click="editComment(comment)">-->
                            <!--<v-icon :size="14" color="grey">-->
                                <!--edit-->
                            <!--</v-icon>-->
                            <!--<span>Edit</span>-->
                        <!--</v-btn>-->

                        <!--<v-btn v-if="isAuthor" flat small class="idea-comment__footer-btn" @click="deleteComment">-->
                            <!--<v-icon :size="14" color="grey">-->
                                <!--delete-->
                            <!--</v-icon>-->
                            <!--<span>Delete</span>-->
                        <!--</v-btn>-->
                    </div>

                    <v-form v-if="showReply" ref="replyForm" class="idea-comment__reply">
                        <i-user-icon :user="loggedInUser" :size="22" class="idea-comment__reply-icon" />

                        <div class="idea-comment__reply-text">
                            <v-textarea
                                v-model="replyText"
                                :rules="[$rules.required('Comment cannot be blank.')]"
                                auto-grow
                                autofocus
                                hide-details
                                color="secondary"
                                rows="1"
                                @keypress.enter="postReply"
                                @keyup.esc="hideReply" />
                        </div>
                    </v-form>

                    <!--<idea-comment v-for="child in replies" :key="child._id" :comment="child" />-->
                </div>
            </v-layout>
        </v-container>
    </v-card>
</template>

<script>
    import {
        mapActions,
        mapGetters,
        mapState,
        mapMutations
    } from "vuex";
    import { scrollToTarget } from "@/lib/mixins";


    export default {
        name: "RCommentItem",
        components: {},
        mixins: [scrollToTarget],
        props: {
            item: {
                type: Object,
                required: true,
                default: () => {}
            },
            light: {
                type: String,
                required: false,
                default: () => ""
            }
        },
        data() {
            return {
                showReply: false,
            };
        },
        computed: {
            ...mapGetters("auth", ["loggedInUser"]),
            ...mapGetters("users", {
                getUser: "get"
            }),
            ...mapGetters("ideas", {
                getIdea: "get"
            }),
            ...mapGetters("search", {
                textBackLight: "textBackLight"
            }),
            idea() {
                return this.getIdea(this.item.idea) || {};
            },
            author() {
                return this.getUser(this.item.createdBy);
            },
            isAuthor() {
                return this.item.createdBy === this.loggedInUser._id;
            }
        },
        watch: {},
        created() {},
        methods: {}
    };
</script>

<style lang="stylus">
    @import '~@/assets/stylus/settings/_variables';
    @import '~@/assets/stylus/settings/_colors';

    .idea-comment {
        box-shadow: 0 0 1px $grey.lighten-2;
        padding: $spacers.two.y (((((((((((((((($spacers.two.x))))))))))))))));

        &:hover {
            box-shadow: 0 0 1px $grey.darken-2;
        }

        &--child {
            box-shadow: none;
            margin-top: $spacers.two.y;
            padding-bottom: 0;
            padding-left: 0;
            padding-top: 0;

            &:hover {
                box-shadow: none;
            }
        }

        &__margin {
            align-items: center;
            display: flex;
            flex-direction: column;
        }

        &__collapse {
            align-items: center;
            display: flex;
            flex: 1 1 auto;
            flex-direction: column;
            margin-top: $spacers.one.y;
            padding: 0 $spacers.two.x;
            transform: translateX(-4px);

            > span {
                background: $grey.lighten-3;
                flex: 1 1 auto;
                // transform: translateX(-2px)
                width: 2px;
            }

            &:hover {
                > span {
                    background: $theme.accent;
                }
            }
        }

        &__main {
            flex: 1 1 auto;
        }

        &__header {
            align-items: center;
            display: flex;
            width: 100%;

            > *:not(:last-child) {
                margin-right: $spacer;
            }
        }

        &__author {
            font-size: 12px;
        }

        &__date {
            font-size: 12px;
            font-style: italic;
        }

        &__text {
            font-size: 16px;
            padding: $spacers.two.y 0 0 0;
        }

        &__footer {
            align-items: center;
            display: flex;
            font-size: 12px;
            justify-content: flex-end;
        }

        &__reply {
            align-items: flex-start;
            border-left: 1px solid $grey.lighten-1;
            display: flex;
            margin: $spacers.two.y 0 0 (((((((((((((((($spacers.two.x))))))))))))))));
            padding: 0 0 $spacers.two.y (((((((((((((((($spacers.two.x))))))))))))))));

            &-icon {
                margin-top: 8px;
            }

            &-text {
                margin-left: $spacers.two.x;
                flex: 1 1 auto;
            }

            .input-group {
                padding: 0;
            }

            .input-group.input-group--solo {
                // background: $grey.lighten-3
                min-height: auto;
                padding: $spacers.one.y 0;

                label {
                    padding-left: $spacers.two.x;
                    top: 5px;
                }

                .input-group__input {
                    padding: 0 $spacers.two.x;

                    textarea {
                        padding: 0;
                    }
                }
            }
        }

        &__footer-btn {
            font-size: 11px;
            min-width: auto;
            margin: 0;
            padding: 0 $spacers.one.x;

            span {
                color: $grey.darken-1;
                display: flex;
                margin-left: $spacers.one.x;
                margin-top: $spacers.one.y;
            }

            & + & {
                margin-left: $spacers.one.x;
            }
        }

        &__vote-count {
            transform: translate(14px, 2px);
        }
    }
</style>
