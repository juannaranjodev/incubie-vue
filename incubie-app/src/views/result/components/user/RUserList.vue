<template>
    <div class="user-list">
        <div class="user-list__items">
            <template v-for="(item) in items">
                <r-user-item :item="item" :key="item._id" :light="light" />
            </template>
        </div>
    </div>
</template>


<script>
    import RUserItem from "./RUserItem";


    export default {
        name: "RUserList",
        components: {
            RUserItem
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
    };
</script>


<style lang="stylus" scoped>
    .user-list {
        &__items {

        }
    }
</style>