"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
// 发现音乐
var state = {
  volume: 50,
  //音量
  lyriclist: [],
  //歌词内容和歌词时间
  lyricIndex: 0,
  //当前正在播放歌词的下标
  musicList: [],
  musicPlayId: 0,
  //这在播放这首歌的 音乐ID
  musicPlayState: false,
  //音乐是否在播放
  musicPageState: false,
  //播放页面的显示隐藏
  musicPlayingTime: 0,
  //当前音乐的播放时间
  totalDurationOfMusic: 0 //音乐总播放时间

};
var getters = {};
var mutations = {
  VOLUME: function VOLUME(state, num) {
    state.volume = num;
  },
  LYRIC_LIST: function LYRIC_LIST(state, list) {
    state.lyriclist = list;
  },
  LYRIC_INDEX: function LYRIC_INDEX(state, index) {
    state.lyricIndex = index;
  },
  MUSCIC_LIST: function MUSCIC_LIST(state, list) {
    state.musicList.unshift(list);
  },
  MUSCI_PLAY_ID: function MUSCI_PLAY_ID(state, id) {
    state.musicPlayId = id;
  },
  MUSIC_PAGE_STATE: function MUSIC_PAGE_STATE(state, bool) {
    state.musicPageState = bool;
  },
  MUSIC_PLAY_STATE: function MUSIC_PLAY_STATE(state, bool) {
    state.musicPlayState = bool;
  },
  MUSIC_PLAYING_TIME: function MUSIC_PLAYING_TIME(state, time) {
    state.musicPlayingTime = time;
  },
  TOTAL_DURATION_OF_MUSIC: function TOTAL_DURATION_OF_MUSIC(state, time) {
    state.totalDurationOfMusic = time;
  }
};
var actions = {};
var playMusicStore = {
  namespaced: true,
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions
};
var _default = playMusicStore;
exports["default"] = _default;