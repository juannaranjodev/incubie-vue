<template>
    <v-toolbar class="main-toolbar" app dark color="secondary" :clipped-left="true">
        <transition name="fade" mode="out-in">
            <v-layout key="nav-bar" v-if="!showSearchField && $vuetify.breakpoint.smAndDown || !$vuetify.breakpoint.smAndDown" align-center row fill-height :justify-space-between="true">
                <div class="main-toolbar__logo">
                    <v-toolbar-side-icon class="mr-4" @click="toggleMenu"/>

                    <router-link :to="{ name: 'feed/main' }">
                                <img src="/images/incubie-logo_alpha.svg">
                    </router-link>
                </div>

                <div class="main-toolbar__actions">
                    <transition name="slide-fade" mode="out-in">
                        <div class="main-toolbar__search" v-if="showSearchField && !$vuetify.breakpoint.smAndDown">
                            <v-text-field class="main-toolbar__search-input" solo append-icon="search" v-model="searchData" placeholder="Search"/>
                            <v-icon v-if="searchData.length" v-on:click="clearSearchData">close</v-icon>
                        </div>

                        <v-btn v-if="!showSearchField && !$vuetify.breakpoint.smAndDown" icon key="search" @click="openSearchField">
                            <v-icon>search</v-icon>
                        </v-btn>
                    </transition>

                    <v-btn :to="{ name: 'upgrade' }" flat color="accent" class="hidden-xs-only">
                        UPGRADE NOW
                    </v-btn>

                    <v-btn v-if="$vuetify.breakpoint.smAndDown" icon key="search" :class="{'ml-a': $vuetify.breakpoint.xsOnly}" @click="openSearchField">
                        <v-icon>search</v-icon>
                    </v-btn>
                </div>
            </v-layout>

            <v-layout key="search-bar" v-if="showSearchField && $vuetify.breakpoint.smAndDown" align-center row fill-height :justify-space-between="true">
                <div class="main-toolbar__search">
                    <v-text-field class="main-toolbar__search-input" ref="mobileSearchInput" solo v-model="searchData" placeholder="Search"/>
                </div>

                <div class="main-toolbar__actions">
                    <v-btn icon class="ml-a" @click="clearSearchData">
                        <v-icon>close</v-icon>
                    </v-btn>
                </div>
            </v-layout>
        </transition>
    </v-toolbar>
</template>

<script>
    import {
        mapActions,
        mapGetters,
        mapState,
        mapMutations
    } from "vuex";


    export default {
        name: "MainToolbar",
        components: {},
        props: {},
        data() {
            return {
                displayMobileSearch: false,
                readyForSearch: false
            };
        },
        computed: {
            ...mapMutations("search", {
                "setSearch": "setValue"
            }),
            ...mapGetters("boards", {
                "board": "current"
            }),
            ...mapGetters("votes", {
                "getVotes": "find"
            }),
            ...mapState("search", {
                "searchText": "value"
            }),
            showSearchField: {
                get() {
                    return (this.searchText.length > 0 || this.readyForSearch);
                },
                set() {}
            },
            searchData: {
                get() {
                    return this.searchText;
                },
                set(value) {
                    this.SET_SEARCH(value);
                }
            }
        },
        watch: {
            "searchText": {
                "handler": function(valueNew, valueOld) {
                    if(valueNew == "" && valueOld != "") {
                        this.readyForSearch = false;
                    }
                }
            }
        },
        created() {},
        methods: {
            ...mapActions("ui", [
                "toggleMainMenu",
                "toggleMainMenuMini"
            ]),
            ...mapActions("search", [
                "SET_SEARCH"
            ]),
            toggleMenu() {
                if(this.$vuetify.breakpoint.smAndDown) {
                    this.toggleMainMenu();
                }
                else {
                    this.toggleMainMenuMini();
                }
            },
            clearSearchData() {
                this.searchData = "";
                this.readyForSearch = false;
            },
            openSearchField() {
                this.readyForSearch = true;
            }
        }
    };
</script>


<style scoped>
    .fade-enter-active, .fade-leave-active {
        transition: opacity 0.5s;
    }

    .fade-enter, .fade-leave-to {
        opacity: 0;
    }


    .slide-fade-enter-active {
        transition: all .3s ease;
    }
    .slide-fade-leave-active {
        transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to {
        transform: translateX(10px);
        opacity: 0;
    }
</style>

<style lang="stylus" scoped>
    @import '~@/assets/stylus/settings/_variables';
    @import '~@/assets/stylus/settings/_colors';



    .main-toolbar {
        &__logo {
            align-items: center;
            display: flex;
            height: 100%;
            padding: $spacers.two.y 0;

            a {
                display: block;
                height: 100%;

                img {
                    width: auto;
                    height: 100%;
                }
            }
        }

        &__current-board {
            margin-left: $spacers.four.x;
        }

        &__search {
            position: relative;

            &-input {
                margin-top: 8px;
                width: 320px;
            }

            .v-icon {
                position: absolute;
                top: 20px;
                right: 50px;
            }
        }

        &__actions {
            position: relative;
            display: flex;
            align-items: center;
        }
    }
</style>

<style lang="stylus">
    @import '~@/assets/stylus/settings/_variables';
    @import '~@/assets/stylus/settings/_colors';

    .main-toolbar {
        &__search {
            .v-icon.primary--text, .v-icon {
                color: #C1C1C1 !important;
                // TODO: class `primary--text` on field icon need to be reviewed
            }

            @media $display-breakpoints.sm-and-down {
                width: 100%;
            }

            &-input {
                @media $display-breakpoints.sm-and-down {
                    width: 100% !important;
                }

                .v-input__control {
                    .v-input__slot {
                        background: #7A7A7B;

                        @media $display-breakpoints.sm-and-down {
                            padding: 0 12px;
                            background: none;
                            border: none;
                            box-shadow: none !important;
                        }

                        .v-text-field__slot {
                            @media $display-breakpoints.sm-and-down {
                                border: none;
                            }
                        }

                        .v-input__icon {

                        }

                        .v-input__slot:after, .v-input__slot:before {
                            @media $display-breakpoints.sm-and-down {
                                display: none;
                            }
                        }
                    }
                }
            }
        }
    }
</style>