// 发现音乐

const state = {
    musicList: [],
    musicPlayId: 0, //这在播放这首歌的 音乐ID
    musicPlayState: false, //音乐是否在播放
    musicPageState: false, //播放页面的显示隐藏
}
const getters = {}
const mutations = {
    MUSCIC_LIST(state, list) {
        state.musicList.unshift(list)
    },
    MUSCI_PLAY_ID(state, id) {
        state.musicPlayId = id
    },
    MUSIC_PAGE_STATE(state, bool) {
        state.musicPageState = bool
    },
    MUSIC_PLAY_STATE(state, bool) {
        state.musicPlayState = bool
    },
}
const actions = {}
const playMusicStore = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}

export default playMusicStore
