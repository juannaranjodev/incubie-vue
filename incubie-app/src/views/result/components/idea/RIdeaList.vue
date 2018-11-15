<template>
    <div class="idea-list">
        <div class="idea-list__items">
            <template v-for="(item) in items">
                <r-idea-item :key="item._id" :item="item" :light="light" />
            </template>
        </div>
    </div>
</template>

<script>
    import RIdeaItem from "./RIdeaItem";


    export default {
        name: 'RIdeaList',
        components: {
            RIdeaItem
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
        data: () => {
            return {
                'ideasList': []
            };
        },
        watch: {
            items: {
                immediate: true,
                handler(ideas) {
                    this.syncIdeas(ideas)
                }
            }
        },
        methods: {
            syncIdeas(ideas) {
                ideas.forEach(idea => {
                    const found = this.ideasList.find(frozenIdea => frozenIdea._id === idea._id);

                    if(!found) {
                        this.ideasList.push(idea);
                    }
                })
            }
        }
    }
</script>

<style lang="stylus" scoped>
    @import "~@/assets/stylus/settings/_variables"


    .idea-list {
        &__items {

        }
    }
</style>