"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSimtAlbum = exports.getAlbumDetail = exports.getAlbumMv = exports.getAlbumTopSong = exports.getAlbum = exports.getArtistSlbum = exports.getArtistDetail = exports.getTopArtists = exports.getToplistArtist = exports.getArtistList = void 0;

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
}; // 歌手详情


exports.getTopArtists = getTopArtists;

var getArtistDetail = function getArtistDetail(params) {
  return _axios["default"].get('/artist/detail', {
    params: params
  });
}; // 获取歌手专辑


exports.getArtistDetail = getArtistDetail;

var getArtistSlbum = function getArtistSlbum(params) {
  return _axios["default"].get('/artist/album', {
    params: params
  });
}; // 获取专辑内容


exports.getArtistSlbum = getArtistSlbum;

var getAlbum = function getAlbum(params) {
  return _axios["default"].get('/album', {
    params: params
  });
}; // 歌手热门50首歌曲


exports.getAlbum = getAlbum;

var getAlbumTopSong = function getAlbumTopSong(params) {
  return _axios["default"].get('/artist/top/song', {
    params: params
  });
}; // 获取歌手 mv


exports.getAlbumTopSong = getAlbumTopSong;

var getAlbumMv = function getAlbumMv(params) {
  return _axios["default"].get('/artist/mv', {
    params: params
  });
}; // 获取歌手详情


exports.getAlbumMv = getAlbumMv;

var getAlbumDetail = function getAlbumDetail(params) {
  return _axios["default"].get('/artist/detail', {
    params: params
  });
}; // 获取相似歌手


exports.getAlbumDetail = getAlbumDetail;

var getSimtAlbum = function getSimtAlbum(params) {
  return _axios["default"].get('/simi/artist', {
    params: params
  });
};

exports.getSimtAlbum = getSimtAlbum;