<template>
    <v-card :flat="!breakpoint" class="user-list-item">
        <router-link :to="{name: 'user/main', params: {userId: item._id}}">
            <div class="user-list-item__content">
                <div class="user-list-item__thumb">
                    <i-user-icon :user="item" :size="46" />
                </div>

                <div class="user-list-item__main">
                    <div class="user-list-item__fullname">
                        <span v-html="textBackLight(item.firstName + ' ' + item.lastName, light)" />
                    </div>

                    <div class="user-list-item__company">
                        {{company.name}}
                    </div>

                    <div class="user-list-item__email" v-html="textBackLight(item.email, light)" />

                    <!--{{item}}-->
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
        name: "RUserItem",
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
        computed: {
            ...mapGetters("search", {
                textBackLight: "textBackLight"
            }),
            ...mapGetters("companies", {
                getCompany: "get"
            }),

            company() {
                return this.getCompany(this.item.lastAccessed) || {};
            },
            breakpoint() {
                return this.$vuetify.breakpoint.xsOnly;
            }
        }
    };
</script>

<style lang="stylus" scoped>
    @import "~@/assets/stylus/settings/_variables"
    @import "~@/assets/stylus/settings/_colors"


    .user-list-item {
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

        &__fullname {
            font-size: 18px
            font-weight: bold
            line-height: 22px

            a {
                hyphens: auto
                overflow-wrap: break-word
                word-wrap: break-word
            }
        }

        &__email {

        }
    }
</style>