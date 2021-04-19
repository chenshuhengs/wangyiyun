// 登录按钮
import { getFans, getFollow, getUserdynamic } from '@/api/login'
const state = {
    id: '',
    name: '',
    avatar: '',
    popup: false,
    loginState: false,
    userLikeMusic: '',
    reportState: false,
}
const getters = {}
const mutations = {
    POPUP(state, bool) {
        state.popup = bool
    },
    USER_ID(state, uid) {
        state.id = uid
    },
    USER_NAME(state, init) {
        state.name = init
    },
    USER_AVATAR(state, url) {
        state.avatar = url
    },
    LOGIN_STATE(state, bool) {
        state.loginState = bool
    },
    REPORT_STATE(state, bool) {
        state.reportState = bool
    },
    USER_LIKE_MUSIC(state, bool) {
        state.userLikeMusic = bool
    },
}
const actions = {
    // 用户粉丝
    async getFansFn({ commit, state }, data) {
        const res = await getFans(data)
    },
    // 用户关注
    async getFollowFn({ commit, state }, data) {
        const res = await getFollow(data)
        return res.data.follow.length > 0 ? res.data.follow : '暂无关注'
    },
    // 用户动态
    async getUserdynamicFn({ commit, state }, data) {
        const res = await getUserdynamic(data)
        return res.data.size == 0 ? '暂无动态' : res.data
    },
}
const loginStore = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}

export default loginStore
