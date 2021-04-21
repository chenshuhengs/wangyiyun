"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMvdetail = exports.getMvAddress = exports.getLikeMusic = exports.getLikeList = exports.getDynamic = exports.getPlaylist = exports.getranking = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// 排行榜
// 歌单榜
var getranking = function getranking() {
  return _axios["default"].get('/toplist/detail');
}; // 歌单详情


exports.getranking = getranking;

var getPlaylist = function getPlaylist(params) {
  return _axios["default"].get("/playlist/detail?id=".concat(params));
}; // 歌单详情动态


exports.getPlaylist = getPlaylist;

var getDynamic = function getDynamic(params) {
  return _axios["default"].get("/playlist/detail/dynamic?id=".concat(params));
}; // 喜欢的音乐列表


exports.getDynamic = getDynamic;

var getLikeList = function getLikeList(params) {
  return _axios["default"].get("/likelist?uid=".concat(params));
}; // 选择音乐 ： 喜欢/不喜欢


exports.getLikeList = getLikeList;

var getLikeMusic = function getLikeMusic(params) {
  return _axios["default"].get("/like?id=".concat(params.id, "&like=").concat(params.like));
}; // mv 播放地址


exports.getLikeMusic = getLikeMusic;

var getMvAddress = function getMvAddress(params) {
  return _axios["default"].get("/mv/url?id=".concat(params));
};

exports.getMvAddress = getMvAddress;

var getMvdetail = function getMvdetail(params) {
  return _axios["default"].get("/mv/detail?mvid=".concat(params));
};

exports.getMvdetail = getMvdetail;