<template>
    <v-card :flat="!breakpoint" class="idea-list-item">
        <router-link :to="{ name: 'idea', params: { idea: item._id } }">
            <div class="idea-list-item__content">
                <div :class="`idea-list-item__status--${item.status}`" class="idea-list-item__status"/>

                <i-vote :parent="item._id" :kind="$constants.voteKinds.ideas" :disabled="item.status === $constants.ideaStatuses.closed" class="mr-2" />

                <div :to="{ name: 'idea', params: { idea: item._id } }" class="idea-list-item__thumb">
                    <img v-if="thumb" :src="thumb">
                    <v-icon v-else :size="32">lightbulb_outline</v-icon>
                </div>

                <div class="idea-list-item__main">
                    <div class="idea-list-item__title" v-html="textBackLight(item.title, light)" />

                    <div v-if="!breakpoint" class="idea-list-item__meta">
                        <router-link :to="{ name: 'user/main', params: { userId: author._id } }" class="u__underline-on-hover">
                            <v-avatar v-if="author.avatar" :size="24" class="mr-1" style="transform: translateY(-2px)">
                                <img :src="author.avatar">
                            </v-avatar>

                            <span>{{ getFullName(author) }}</span>
                        </router-link>

                        <span class="pl-1">({{ author.voteCount }})</span>

                        <router-link :to="{ name: 'idea', params: { idea: item._id } }" class="mx-3 u__underline-on-hover">
                            {{ item.commentCount | formatNumber }} Comments
                        </router-link>

                        <span v-if="!board">
                            {{ item.createdAt | formatDateFromNow }} in {{ getBoard(item.board).name }}
                        </span>
                    </div>
                </div>
            </div>

            <div v-if="breakpoint" class="idea-list-item__meta">
                <router-link :to="{ name: 'user/main', params: { userId: author._id } }">
                    <v-avatar v-if="author.avatar" :size="24" class="mr-1" style="transform: translateY(-2px)">
                        <img :src="author.avatar">
                    </v-avatar>

                    <span>{{ getFullName(author) }}</span>
                    <span class="pl-1">({{ author.voteCount }})</span>
                </router-link>

                <span style="margin-left: auto"> {{ item.commentCount | formatNumber }} Comments</span>
            </div>
        </router-link>
    </v-card>
</template>

<script>
    import {
        mapActions,
        mapGetters,
        mapState
    } from 'vuex';


    export default {
        name: "RIdeaItem",
        props: {
            item: {
                type: Object,
                required: false,
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
                hasVoted: null
            }
        },
        computed: {
            ...mapState('votes', ['isVotePending']),
            ...mapGetters('auth', ['loggedInUser']),
            ...mapGetters('users', {
                getUser: 'get',
                getFullName: 'fullName'
            }),
            ...mapGetters('boards', {
                board: 'current',
                getBoard: 'get'
            }),
            ...mapGetters('votes', {
                hasUserVoted: 'hasVoted'
            }),
            ...mapGetters('ideas', {
                getThumb: 'thumb',
                getIdea: 'get'
            }),
            ...mapGetters("search", {
                textBackLight: "textBackLight"
            }),
            breakpoint() {
                return this.$vuetify.breakpoint.xsOnly;
            },
            thumb () {
                return this.getThumb(this.item);
            },
            author () {
                return this.getUser(this.item.createdBy);
            },
            isCreator () {
                return this.item.createdBy._id === this.loggedInUser._id;
            },
            voteBtnTitle () {
                let title = 'Vote';

                if(this.isCreator) {
                    title = 'You cannot remove your vote for an idea you created.';
                }
                else if(this.hasVoted) {
                    title = 'Unvote';
                }

                return title;
            },
            ideaVote () {
                return {
                    parent: this.item._id,
                    kind: this.$constants.voteKinds.ideas,
                    owner: this.item.createdBy,
                    voter: this.loggedInUser._id
                };
            }
        },
        watch: {},
        created() {
            this.hasVoted = this.hasUserVoted(this.loggedInUser._id, this.item);
        },
        methods: {
            ...mapActions('votes', {
                vote: 'create',
                unvote: 'remove'
            }),
            async doVote() {
                if(this.hasVoted) {
                    await this.unvote(this.ideaVote);
                    this.hasVoted = false;
                }
                else {
                    await this.vote(this.ideaVote);
                    this.hasVoted = true;
                }
            },
            goToIdea(id) {
                this.$router.push({
                    name: 'idea',
                    params: {
                        idea: id
                    }
                });
            }
        }
    };
</script>

<style lang="stylus" scoped>
    @import "~@/assets/stylus/settings/_variables"
    @import "~@/assets/stylus/settings/_colors"

    .idea-list-item {
        box-shadow: 0 0 1px $grey.lighten-2
        margin-bottom: $spacers.one.y
        position: relative

        &__content {
            display: flex
            padding: $spacers.two.y $spacers.one.x
        }


        &__vote {
            align-items: center
            align-self: center
            display: flex
            flex-direction: column
            font-weight: bold
            justify-content: center
            order: 0
            position: relative

            &__btn {
                margin: 0
                z-index: 1
            }

            &__count {
                font-size: 24px
                line-height: 1
                transform: translateY(-14px)
            }
        }


        &__thumb {
            align-items: center
            border: 1px solid $grey.lighten-2
            border-radius: 2px
            display: flex
            flex: 0 0 75px
            height: 75px
            justify-content: center
            margin-left: auto
            order: 3
            overflow: hidden

            img {
                height: 100%
                object-fit: cover
                width: 100%
            }
        }


        &__main {
            margin-left: $spacers.two.x
            margin-right: $spacers.two.x
            order: 2
        }


        &__title {
            font-size: 18px
            font-weight: bold
            line-height: 22px

            a {
                hyphens: auto
                overflow-wrap: break-word
                word-wrap: break-word
            }
        }


        &__meta {
            align-items: center
            display: flex
            // justify-content: space-between
            padding: $spacers.two.y $spacers.three.x
        }


        &__comment-count {
            font-size: 12px
        }


        &__status {
            border-radius: 50%
            display: block
            height: 9px
            position: absolute
            left: $spacers.two.x
            top: $spacers.two.y
            width: 9px

            &--committed {
                background-color: $theme.committed
            }

            &--proposed {
                background-color: $theme.proposed
            }

            &--closed {
                background-color: $theme.closed
            }
        }


        @media $display-breakpoints.sm-and-up {
            border-radius: 0
            margin-bottom: 0

            &:hover {
                box-shadow: 0 0 1px $grey.darken-2
            }

            &__content {
                padding: $spacers.three.y $spacers.two.x
            }

            &__vote {
                margin-right: $spacers.two.x
                order: 1

                &__count {
                    transform: translateY(-12px)
                }
            }

            &__thumb {
                flex: 0 0 60px
                height: 60px
                margin-left: 0
                margin-right: $spacers.two.x
                order: 2
            }

            &__main {
                align-items: center
                display: flex
                flex-wrap: wrap
            }

            &__title {
                flex: 0 0 100%
                order: auto
            }

            &__meta {
                align-items: center
                display: flex
                flex: 0 0 100%
                justify-content: flex-start
                // padding: $spacers.two.y 0 0 0
                margin-top: $spacers.two.y
                padding: 0
            }

            &__comment-count {
                align-items: center
                display: flex
                font-size: 14px
            }

            &__status {
                height: 13px
                left: auto
                right: $spacers.two.x
                width: 13px
            }

        }
    }
</style>