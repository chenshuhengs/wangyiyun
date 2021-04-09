// 发现音乐
const state = {
    activeLable: '全部歌单', //默认 选中全部歌单
}
const getters = {}
const mutations = {
    ACIVE_LABLE(state, lablename) {
        state.activeLable = lablename
    },
}
const actions = {}
const discoverStore = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}

export default discoverStore
