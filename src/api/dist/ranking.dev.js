"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSimiMv = exports.getCommentLike = exports.getCommentMv = exports.getCommentDelete = exports.getComment = exports.getMvSub = exports.getMvSublist = exports.getResourceLike = exports.getPlaylistMylike = exports.getDetailInfo = exports.getMvdetail = exports.getMvAddress = exports.getLikeMusic = exports.getLikeList = exports.getDynamic = exports.getPlaylist = exports.getranking = void 0;

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
}; // 获取 mv 数据


exports.getMvAddress = getMvAddress;

var getMvdetail = function getMvdetail(params) {
  return _axios["default"].get("/mv/detail?mvid=".concat(params));
}; //获取 mv 点赞转发评论数数据


exports.getMvdetail = getMvdetail;

var getDetailInfo = function getDetailInfo(params) {
  return _axios["default"].get("/mv/detail/info?mvid=".concat(params));
}; // 获取点赞过的视频


exports.getDetailInfo = getDetailInfo;

var getPlaylistMylike = function getPlaylistMylike(params) {
  return _axios["default"].get("/playlist/mylike");
}; // 资源点赞( MV,电台,视频)


exports.getPlaylistMylike = getPlaylistMylike;

var getResourceLike = function getResourceLike(params) {
  return _axios["default"].get("/resource/like?t=".concat(params.t, "&type=").concat(params.type, "&id=").concat(params.id));
}; // 收藏的 MV 列表


exports.getResourceLike = getResourceLike;

var getMvSublist = function getMvSublist(params) {
  return _axios["default"].get("/mv/sublist");
}; // 收藏/取消收藏 MV


exports.getMvSublist = getMvSublist;

var getMvSub = function getMvSub(params) {
  return _axios["default"].get("/mv/sub?mvid=".concat(params.id, "&t=").concat(params.t));
}; // 发送评论


exports.getMvSub = getMvSub;

var getComment = function getComment(params) {
  return _axios["default"].get("/comment?t=".concat(params.t, "&type=").concat(params.type, "&id=").concat(params.id, "&content=").concat(params.content, "&commentId=").concat(params.commentId));
}; // 删除评论


exports.getComment = getComment;

var getCommentDelete = function getCommentDelete(params) {
  return _axios["default"].get("/comment?t=".concat(params.t, "&type=").concat(params.type, "&id=").concat(params.id, "&commentId=").concat(params.commentId));
}; // mv 评论


exports.getCommentDelete = getCommentDelete;

var getCommentMv = function getCommentMv(params) {
  return _axios["default"].get("/comment/mv?id=".concat(params.id));
}; // 给评论点赞


exports.getCommentMv = getCommentMv;

var getCommentLike = function getCommentLike(params) {
  return _axios["default"].get("/comment/like?id=".concat(params.id, "&cid=").concat(params.cid, "&t=").concat(params.t, "&type=").concat(params.type));
}; // 相似MV


exports.getCommentLike = getCommentLike;

var getSimiMv = function getSimiMv(params) {
  return _axios["default"].get("/simi/mv?mvid=".concat(params.id));
};

exports.getSimiMv = getSimiMv;