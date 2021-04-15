// 发现音乐
import { getTagList, getBoutiqueSong, getBoutiqueList } from '@/api/songsheet.js'
const state = {
    total: 0, //音乐总数量
    fineMusic: '', //精品音乐
    popUpClose: false, //弹窗关闭显示
    activeLable: '全部', //默认 选中全部歌单
}
const getters = {}
const mutations = {
    GET_TOTAL(state, length) {
        state.total = length
    },
    FINE_MUSIC(state, name) {
        state.fineMusic = name
    },
    ACIVE_LABLE(state, lablename) {
        state.activeLable = lablename
    },
    POP_UP_CLOST(state, bool) {
        state.popUpClose = bool
    },
}
const actions = {
    async getTagListFu() {
        const res = await getTagList()
        return res.data
    },
    async getBoutiqueSong({ commit, state }, data) {
        if (!data) {
            const res = await getBoutiqueSong({
                limit: 1,
                cat: state.activeLable,
            })
            commit('FINE_MUSIC', res.data)
        } else {
            const res = await getBoutiqueSong({
                limit: data.limit,
                cat: data.cat,
            })
            console.log(res.data.total)
            commit('GET_TOTAL', res.data.total)
            return res
        }
    },
    async getBoutiqueList({ commit, state }, data) {
        if (data.cat && data.limit && data.offset) {
            const res = await getBoutiqueList({
                limit: data.limit,
                offset: data.offset * data.limit,
                cat: state.activeLable,
            })
            commit('GET_TOTAL', res.data.total)
            return res.data
        }
    },
}
const discoverStore = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}

export default discoverStore
