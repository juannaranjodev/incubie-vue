import actionTypes from '../action-types'
import {
    sortByTypes
} from '@/constants'
import {
    get
} from 'lodash'


const state = {};

const getters = {
    thumb: (state) => (idea) => get(idea, 'images[0].thumb'),
    currentThumb: (state, getters) => get(getters['current'], 'images[0].thumb'),
    boardList: (state, getters) => boardId => getters['list'].filter(idea => idea.board._id === boardId),
    statusTypes: state => [
        {text: 'Committed', value: 'committed'},
        {text: 'Proposed', value: 'proposed'},
        {text: 'Closed', value: 'closed'}
    ],
    hasMore: (state) => {
        const pagination = get(state, 'pagination.default');

        if (pagination) {
            const {
                limit,
                skip,
                total
            } = pagination

            return (limit + skip) < total
        } else {
            return false
        }
    },
    shareLink: (state, getters) => {
        return window.location.href
    },
    trialIdeasCount: () => 50,// ruby test Change this to 50
};

const actions = {
    async create({dispatch, rootGetters, rootState}, idea) {
        const company = rootGetters['companies/current'];

        return dispatch('actions/dispatch', {
            type: actionTypes.CREATE_IDEA,
            payload: idea,
            entity: company._id
        }, {
            root: true
        });
    },

    async vote({dispatch, getters, rootGetters, rootState}, id) {
        const idea = getters['get'](id)
        const company = get(rootGetters['companies/current'], '_id')
        const user = rootState.auth.user
        const hasUserVoted = getters['hasUserVoted'](idea, user._id)

        await dispatch('actions/dispatch', {
            type: hasUserVoted ? actionTypes.REMOVE_IDEA_VOTE : actionTypes.IDEA_VOTE,
            entity: company,
            payload: {
                idea: idea._id,
                user: user._id
            }
        }, {
            root: true
        });
    },

    async findBySort({commit, dispatch, state, rootGetters, rootState}, query = {}) {
        const sortBy = rootState.ui.sortIdeasBy;
        const sortParams = {};
        const company = get(rootGetters['companies/current'], '_id');

        if (sortBy === sortByTypes.top.value) {
            sortParams.voteCount = -1;
            sortParams.createdAt = -1;
        } else if (sortBy === sortByTypes.new.value) {
            sortParams.createdAt = -1;
        }

        await commit('clearList');

        return dispatch('find', {
            query: {
                ...query,
                company,
                $limit: 20,
                $skip: 0,
                $sort: sortParams
            }
        });
    },

    async search({commit, dispatch}, params) {
        if(typeof params == "string") {
            params = {
                "kw": params
            };
        }

        let kw = {};

        if(params.kw) {
            kw.$search = params.kw || "";

            delete params.kw;
        }

        return dispatch('find', {
            query: {
                $or: [
                    {title: kw, ...params},
                    {description: kw, ...params}
                ]
            }
        });
    },

    async findNextPage({dispatch, getters, rootGetters, state}, query) {
        const pagination = get(state, 'pagination.default')
        const skip = get(state, 'ids.length')

        if (pagination) {
            const query = Object.assign(pagination.query, {
                $skip: skip
            });

            await dispatch('find', {
                query
            });
        }
    },

    async load({commit, dispatch, getters, rootGetters}, id) {
        const company = rootGetters['companies/current'];
        let idea = getters['get'](id);

        idea && commit('setCurrent', idea);

        if (!idea) {
            idea = await dispatch('get', [id, {
                query: {
                    company: company._id
                }
            }]);

            if (!idea) {
                throw new Error('Invalid idea id.')
            }
        }

        commit('boards/setCurrent', idea.board, {
            root: true
        });

        dispatch('comments/load', null, {
            root: true
        });
    },

    async unload({commit}) {
        commit('clearCurrent')
    }
};

const mutations = {};

const instanceDefaults = {
    images: []
};

export default {
    state,
    getters,
    actions,
    mutations,
    instanceDefaults
};