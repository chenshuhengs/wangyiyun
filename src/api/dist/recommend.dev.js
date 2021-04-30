"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDj = exports.getNewMusice = exports.getRecommendMusic = exports.getSoleList = exports.getSole = exports.getMv = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// 推荐 各类音乐 列表
//! 个性推荐 API
// 推荐MV
var getMv = function getMv() {
  return _axios["default"].get('/personalized/mv');
}; // 独家放送


exports.getMv = getMv;

var getSole = function getSole(params) {
  return _axios["default"].get("/personalized/privatecontent");
}; // 独家放送列表


exports.getSole = getSole;

var getSoleList = function getSoleList(params) {
  return _axios["default"].get("/personalized/privatecontent/list", {
    params: params
  });
}; // 推荐歌单


exports.getSoleList = getSoleList;

var getRecommendMusic = function getRecommendMusic() {
  return _axios["default"].get("/personalized?limit=10");
}; // 最新音乐


exports.getRecommendMusic = getRecommendMusic;

var getNewMusice = function getNewMusice(limit) {
  return _axios["default"].get("/personalized/newsong?limit=12");
}; // 主播电台


exports.getNewMusice = getNewMusice;

var getDj = function getDj() {
  return _axios["default"].get('/dj/program/detail');
};

exports.getDj = getDj;