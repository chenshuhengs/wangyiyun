// 发现音乐

const state = {
    musicList: [],
    musicPlayId: 0, //这在播放这首歌的 音乐ID
    musicPlayState: false, //音乐是否在播放
    musicPageState: false, //播放页面的显示隐藏
    musicPlayingTime: 0, //当前音乐的播放时间
    totalDurationOfMusic: 0, //音乐总播放时间
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
    MUSIC_PLAYING_TIME(state, time) {
        state.musicPlayingTime = time
    },
    TOTAL_DURATION_OF_MUSIC(state, time) {
        state.totalDurationOfMusic = time
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
