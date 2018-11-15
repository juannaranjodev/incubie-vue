<template>
    <div class="result-main">
        <result-block title="Ideas" :count="ideas.length">
            <r-idea-list :items="ideas" :light="searchValue" />
        </result-block>

        <result-block title="Comments" :count="comments.length">
            <r-comment-list :items="comments" :light="searchValue" />
        </result-block>

        <result-block title="Boards" :count="boards.length">
            <r-board-list :items="boards" :light="searchValue" />
        </result-block>

        <result-block title="Users" :count="users.length">
            <r-user-list :items="users" :light="searchValue" />
        </result-block>
    </div>
</template>


<script>
    import {
        mapGetters,
        mapMutations,
        mapState,
        mapActions
    } from 'vuex'
    import ResultBlock from "./components/blocks/ResultBlock";
    import RIdeaList from "./components/idea/RIdeaList";
    import RCommentList from "./components/comment/RCommentList";
    import RBoardList from "./components/board/RBoardList";
    import RUserList from "./components/user/RUserList";


    export default {
        name: "ResultMain",
        components: {
            ResultBlock,
            RIdeaList,
            RBoardList,
            RCommentList,
            RUserList
        },
        props: {},
        data() {
            return {};
        },
        computed: {
            ...mapState("search", {
                "searchValue": "value",
                "ideas": "ideasList",
                "comments": "commentsList",
                "boards": "boardsList",
                "users": "usersList"
            })
        },
        watch: {},
        created() {},
        methods: {}
    }
</script>


<style lang="stylus" scoped>
    @import '~@/assets/stylus/settings/_variables';
    @import '~@/assets/stylus/settings/_colors';

    .result-main {

    }
</style>