<template>
    <div class="board-list">
        <div class="board-list__items">
            <template v-for="(item, index, key) in items">
                <r-board-item :item="item" :key="key" :light="light" />
            </template>
        </div>
    </div>
</template>


<script>
    import RBoardItem from "./RBoardItem";


    export default {
        name: "RBoardList",
        components: {
            RBoardItem
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
        }
    }
</script>


<style lang="stylus" scoped>
    @import "~@/assets/stylus/settings/_variables"
    @import "~@/assets/stylus/settings/_colors"


    .board-list {
        &__items {

        }
    }
</style>