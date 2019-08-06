import {
    mapGetters,
    mapMutations,
    mapState
} from 'vuex'


export default {
    namespaced: true,
    state: {
        "value": "",
        "pause": false,
        "timer": false,
        "ideasList": [],
        "commentsList": [],
        "boardsList": [],
        "usersList": []
    },
    getters: {
        load: (state, getters, rootState, rootGetters) => {
            if(rootState.ideas.isFindPending) {
                return true;
            }
            else {
                return false;
            }
        },
        textBackLight: () => {
            return (str, light) => {
                if(light && light.length) {
                    let values = light.trim().replace(new RegExp("\\s+", "g"), " ").split(" ");

                    for(let i in values) {
                        str = str.replace(new RegExp("(" + values[i] + ")", "ig"), "<span class=\"ligth\" style=\"background: #DFD6AD;\">$1</span>");
                    }
                }

                return str;
            };
        },
        regExpEscape: () => {
            return (s) => {
                return String(s).replace(new RegExp("([-()\\[\\]{}+?*.$\\^|,:#<!\\\\])", "g"), '\\$1').replace(new RegExp("\x08", "g"), '\\x08')
            };
        },
        test: (state, getters, rootState, rootGetters) => {
            return (kw, text) => {
                if(typeof text == "string") {
                    let values = kw.trim().split(new RegExp("\\s+"));

                    for(let i in values) {
                        let value = values[i];

                        if(text.search(new RegExp(getters.regExpEscape(value), "i")) >= 0) {
                            return true;
                        }
                    }

                    return false;
                }
                else if(Array.isArray(text)) {
                    let bool = false;

                    for(let i in text) {
                        let str = text[i];

                        if(getters.test(kw, str)) {
                            bool = true;
                        }
                    }

                    return bool;
                }

                return false;
            };
        }
    },
    mutations: {
        "setValue": (state, value) => {
            state.value = value;
        },
        "timer": (state, value) => {
            state.timer = value;
        },
        "setIdeas": (state, value) => {
            state.ideasList = value;
        },
        "setComments": (state, value) => {
            state.commentsList = value;
        },
        "setUsers": (state, value) => {
            state.usersList = value;
        },
        "setBoards": (state, value) => {
            state.boardsList = value;
        }
    },
    actions: {
        async getBoards({state, commit, dispatch, getters}, kw) {
            let boardId = this.state.boards.currentId;

            return this.getters["boards/list"].filter((board) => {
                return getters.test(kw, [board.name, board.description]);
            });
        },
        async getIdeas({commit, dispatch, getters}, kw) {
            let boardId = this.state.boards.currentId;

            let params = {
                "kw": kw
            };

            if(boardId) {
                params.board = boardId;
            }

            return this.dispatch("ideas/search", params).then((res) => {
                commit("setIdeas", res.data);

                return res.data;
            });

            // return this.getters["ideas/list"].filter((idea) => {
            //     return getters.test(kw, [idea.title]);
            // });
        },
        async getComments({commit, dispatch, getters}, kw) {
            let ideaId = this.state.ideas.currentId,
                boardId = this.state.boards.currentId;

            let params = {
                "kw": kw
            };

            if(ideaId) {
                params.idea = ideaId;
            }

            if(!ideaId && boardId) {
                await this.dispatch("ideas/find", {
                    "board": boardId
                }).then((res) => {
                    let ids = [];

                    for(let i in res.data) {
                        let idea = res.data[i];

                        ids.push(idea._id);
                    }

                    if(ids.length) {
                        params.idea = ids;
                    }
                });
            }

            return this.dispatch("comments/search", params).then((res) => {
                return res.data;
            });

            // return this.getters["comments/list"].filter((comment) => {
            //     return getters.test(kw, [comment.text]);
            // });
        },
        async getUsers({getters, commit}, kw) {
            // return this.dispatch("users/search", kw).then((res) => {
            //     let promises = [];
            //
            //     for(let i in res.data) {
            //         let companyId = res.data[i].lastAccessed;
            //
            //         promises.push(this.dispatch("companies/get", companyId));
            //     }
            //
            //     return Promise.all([
            //         promises
            //     ]).then(() => {
            //         commit("setUsers", res.data);
            //
            //         return res.data;
            //     });
            // });
            return this.getters["users/list"].filter((user) => {
                return getters.test(kw, [user.firstName, user.lastName]);
            });
        },
        async SET_SEARCH({state, commit, dispatch}, value) {
            if(state.value != value && value != "") {
                commit('setValue', value);

                await dispatch('runSearch');
            }
            else {
                let timer = state.timer;

                if(timer) {
                    clearTimeout(timer);
                    this.commit("ui/clearLoading");
                }

                commit("timer", timer);
                commit('setValue', value);
            }
        },
        async runSearch({commit, dispatch, state}) {
            let timer = state.timer;

            this.commit("ui/setLoading");

            if(timer) {
                clearTimeout(timer);
            }
            else {
                commit("setIdeas", []);
                commit("setComments", []);
                commit("setBoards", []);
                commit("setUsers", []);
            }

            timer = setTimeout(async () => {
                Promise.all([
                    dispatch("getIdeas", state.value).then((ideas) => {
                        commit("setIdeas", ideas);
                    }),
                    dispatch("getComments", state.value).then((comments) => {
                        commit("setComments", comments)
                    }),
                    dispatch("getBoards", state.value).then((boards) => {
                        commit("setBoards", boards);
                    }),
                    dispatch("getUsers", state.value).then((users) => {
                        commit("setUsers", users);
                    })
                ]).then(() => {
                    this.commit("ui/clearLoading");
                });
            }, 2000);

            commit("timer", timer);
        }
    }
};