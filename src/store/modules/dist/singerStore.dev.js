"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
// 歌手
var state = {
  screenType: -1,
  //筛选
  screenName: '热门',
  languagesType: -1,
  //语种
  languagesName: '全部',
  classificationType: -1,
  //分类
  classificationName: '全部'
};
var getters = {};
var mutations = {
  SCREEN_TYPE: function SCREEN_TYPE(state, type) {
    state.screenType = type;
  },
  SCREEN_NAME: function SCREEN_NAME(state, name) {
    state.screenName = name;
  },
  LANGUAGES_TYPE: function LANGUAGES_TYPE(state, type) {
    state.languagesType = type;
  },
  LANGUAGES_NAME: function LANGUAGES_NAME(state, name) {
    state.languagesName = name;
  },
  CLASSIFICATION_TYPE: function CLASSIFICATION_TYPE(state, type) {
    state.classificationType = type;
  },
  CLASSIFICATION_NAME: function CLASSIFICATION_NAME(state, name) {
    state.classificationName = name;
  }
};
var actions = {};
var singerStore = {
  namespaced: true,
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions
};
var _default = singerStore;
exports["default"] = _default;