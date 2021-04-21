// 登录按钮
import { getLikeList, getDynamic, getLikeMusic } from '@/api/ranking'
import { getFans, getFollow, getSubscribe, getUserdynamic } from '@/api/login'
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
    // 收藏 / 取消 歌单
    async getSubscribeFn({ commit, state, dispatch }, data) {
        const res = await getSubscribe(data)
        if (res.data.code == 200) {
            return dispatch('getDynamicFn', { id: data.id })
        }
    },
    // 歌单详情动态 --> 调用后可获取歌单详情动态部分,如评论数,是否收藏,播放数
    async getDynamicFn({ commit, state }, data) {
        const res = await getDynamic(data.id)
        return res.data
    },
    // 喜欢的音乐
    async getLikeListFn({ commit, state }, data) {
        const res = await getLikeList(data)
        return res.data
    },
    // 选择音乐：喜欢 或 取消喜欢
    async chooseMusicFn({ commit, state }, data) {
        const res = await getLikeMusic(data)
        return res
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
