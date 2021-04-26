"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTopArtists = exports.getToplistArtist = exports.getArtistList = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// 歌手
// 歌手分类列表
var getArtistList = function getArtistList(params) {
  return _axios["default"].get('/artist/list', {
    params: params
  });
}; // 歌手榜


exports.getArtistList = getArtistList;

var getToplistArtist = function getToplistArtist(params) {
  return _axios["default"].get('/toplist/artist', {
    params: params
  });
}; // 热门歌手


exports.getToplistArtist = getToplistArtist;

var getTopArtists = function getTopArtists(params) {
  return _axios["default"].get('/top/artists', {
    params: params
  });
};

exports.getTopArtists = getTopArtists;