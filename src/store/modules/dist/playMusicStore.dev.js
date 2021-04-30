"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
// 发现音乐
var state = {
  musicList: [],
  musicPlayId: 0,
  //这在播放这首歌的 音乐ID
  musicPlayState: false,
  //音乐是否在播放
  musicPageState: false //播放页面的显示隐藏

};
var getters = {};
var mutations = {
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