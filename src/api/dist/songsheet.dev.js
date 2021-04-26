"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPlaylistSubscribers = exports.getBoutiqueSong = exports.getTagList = exports.getBoutiqueList = exports.getWholeSong = exports.getSongListTypes = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// 歌单
// 歌单类别
var getSongListTypes = function getSongListTypes() {
  return _axios["default"].get('/playlist/hot');
}; // 全部歌单


exports.getSongListTypes = getSongListTypes;

var getWholeSong = function getWholeSong() {
  return _axios["default"].get('/playlist/catlist');
}; // 精品歌单列表


exports.getWholeSong = getWholeSong;

var getBoutiqueList = function getBoutiqueList(params) {
  return _axios["default"].get('/top/playlist', {
    params: params
  });
}; //精品歌单类型


exports.getBoutiqueList = getBoutiqueList;

var getTagList = function getTagList(params) {
  return _axios["default"].get('/playlist/highquality/tags', {
    params: params
  });
}; // 精品歌单


exports.getTagList = getTagList;

var getBoutiqueSong = function getBoutiqueSong(params) {
  return _axios["default"].get('/top/playlist/highquality', {
    params: params
  });
}; // 歌单收藏者


exports.getBoutiqueSong = getBoutiqueSong;

var getPlaylistSubscribers = function getPlaylistSubscribers(params) {
  return _axios["default"].get('/playlist/subscribers', {
    params: params
  });
};

exports.getPlaylistSubscribers = getPlaylistSubscribers;