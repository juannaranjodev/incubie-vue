<template>
    <div class="results">
        <div class="results__title v-toolbar lighten-1 secondary theme--dark">
            <div class="v-toolbar__content" style="height: 64px;">
                <div class="v-toolbar__title title font-weight-bold">{{title}}</div>
            </div>
        </div>

        <i-container>
            <div class="results__content">
                <template v-if="count == 0">
                    0 {{title}} found
                </template>

                <template>
                    <slot />
                </template>
            </div>
        </i-container>
    </div>
</template>

<script>
    export default {
        name: "ResultBlock",
        components: {},
        props: {
            title: {
                default: ""
            },
            count: {
                default: 0
            }
        },
        data() {
            return {}
        },
        computed: {},
        watch: {},
        created () {},
        methods: {}
    };
</script>

<style lang="stylus" scoped>

</style>