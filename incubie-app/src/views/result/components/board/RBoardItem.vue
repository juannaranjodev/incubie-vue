<template>
    <v-card :flat="!breakpoint" class="board-list-item">
        <router-link :to="{name: 'board/main', params: {boardSlug: item.slug}}">
            <div class="board-list-item__content">
                <div class="board-list-item__thumb">
                    <i-board-icon :board="item" :size="46"/>
                </div>

                <div class="board-list-item__main">
                    <div class="board-list-item__name" v-html="textBackLight(item.name, light)" />
                    <div class="board-list-item__description" v-html="textBackLight(item.description, light)" />
                </div>
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
        name: "RBoardItem",
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
        data: () => {
            return {};
        },
        computed: {
            ...mapGetters("search", {
                textBackLight: "textBackLight"
            }),
            breakpoint() {
                return this.$vuetify.breakpoint.xsOnly;
            }
        },
        methods: {

        }
    };
</script>


<style lang="stylus" scoped>
    @import "~@/assets/stylus/settings/_variables"
    @import "~@/assets/stylus/settings/_colors"

    .board-list-item {
        box-shadow: 0 0 1px $grey.lighten-2
        margin-bottom: $spacers.one.y
        position: relative

        &__content {
            display: flex
            padding: $spacers.two.y $spacers.one.x
        }

        &__thumb {
            align-items: center
            border-radius: 2px
            display: flex
            flex: 0 0 75px
            height: 75px
            justify-content: center
            margin-left: auto
            order: 1
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
            width 100%
        }

        &__name {
            font-size: 18px
            font-weight: bold
            line-height: 22px

            a {
                hyphens: auto
                overflow-wrap: break-word
                word-wrap: break-word
            }
        }
    }
</style>