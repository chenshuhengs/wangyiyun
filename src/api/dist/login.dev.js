"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSubscribe = exports.getFans = exports.getFollow = exports.getUserdynamic = exports.login = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// 登录
var login = function login(params) {
  return _axios["default"].post('/login/cellphone', params);
}; // 用户动态


exports.login = login;

var getUserdynamic = function getUserdynamic(params) {
  return _axios["default"].get("/user/event?uid=".concat(params));
}; // 用户关注


exports.getUserdynamic = getUserdynamic;

var getFollow = function getFollow(params) {
  return _axios["default"].get("/user/follows?uid=".concat(params));
}; // 粉丝


exports.getFollow = getFollow;

var getFans = function getFans(params) {
  return _axios["default"].get("/user/followeds?uid=");
}; // 收藏歌单 / 取消收藏


exports.getFans = getFans;

var getSubscribe = function getSubscribe(params) {
  return _axios["default"].get("/playlist/subscribe?t=".concat(params.type, "&id=").concat(params.id));
};

exports.getSubscribe = getSubscribe;