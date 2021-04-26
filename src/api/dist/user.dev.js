"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserfolloweds = exports.getUserFollows = exports.getUserEvent = exports.getFollow = exports.getUserPlaylist = exports.getUserDetail = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// 获取用户详情
var getUserDetail = function getUserDetail(params) {
  return _axios["default"].get("/user/detail?uid=".concat(params.id));
}; // 获取用户歌单


exports.getUserDetail = getUserDetail;

var getUserPlaylist = function getUserPlaylist(params) {
  return _axios["default"].get("/user/playlist?uid=".concat(params.id));
}; // 关注/取消关注用户


exports.getUserPlaylist = getUserPlaylist;

var getFollow = function getFollow(params) {
  return _axios["default"].get("/follow?id=".concat(params.id, "&t=").concat(params.t));
}; // 用户动态


exports.getFollow = getFollow;

var getUserEvent = function getUserEvent(params) {
  return _axios["default"].get("/user/event?uid=".concat(params.id, "&limit=").concat(params.limit));
}; // 用户关注


exports.getUserEvent = getUserEvent;

var getUserFollows = function getUserFollows(params) {
  return _axios["default"].get("/user/follows?uid=".concat(params.id, "&offset=").concat(params.offset));
}; // 粉丝


exports.getUserFollows = getUserFollows;

var getUserfolloweds = function getUserfolloweds(params) {
  return _axios["default"].get("/user/followeds?uid=".concat(params.id));
};

exports.getUserfolloweds = getUserfolloweds;