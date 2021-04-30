"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLyric = exports.getUserRecord = exports.getCheckMusic = exports.getSongUrl = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// 音乐播放
// 获取音乐 url
var getSongUrl = function getSongUrl(params) {
  return _axios["default"].get("/song/url", {
    params: params
  });
}; // 音乐是否可用


exports.getSongUrl = getSongUrl;

var getCheckMusic = function getCheckMusic(params) {
  return _axios["default"].get("/check/music", {
    params: params
  });
}; // 获取用户播放记录


exports.getCheckMusic = getCheckMusic;

var getUserRecord = function getUserRecord(params) {
  return _axios["default"].get("/user/record", {
    params: params
  });
}; // 获取歌词


exports.getUserRecord = getUserRecord;

var getLyric = function getLyric(params) {
  return _axios["default"].get("/lyric", {
    params: params
  });
};

exports.getLyric = getLyric;