// 歌手

const state = {
    screenType: -1, //筛选
    screenName: '热门',
    languagesType: -1, //语种
    languagesName: '全部',
    classificationType: -1, //分类
    classificationName: '全部',
}
const getters = {}
const mutations = {
    SCREEN_TYPE(state, type) {
        state.screenType = type
    },
    SCREEN_NAME(state, name) {
        state.screenName = name
    },
    LANGUAGES_TYPE(state, type) {
        state.languagesType = type
    },
    LANGUAGES_NAME(state, name) {
        state.languagesName = name
    },
    CLASSIFICATION_TYPE(state, type) {
        state.classificationType = type
    },
    CLASSIFICATION_NAME(state, name) {
        state.classificationName = name
    },
}
const actions = {}
const singerStore = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}

export default singerStore
