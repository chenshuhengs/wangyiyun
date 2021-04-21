"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ranking = require("@/api/ranking");

var _login = require("@/api/login");

// 登录按钮
var state = {
  id: '',
  name: '',
  avatar: '',
  popup: false,
  loginState: false,
  userLikeMusic: '',
  reportState: false
};
var getters = {};
var mutations = {
  POPUP: function POPUP(state, bool) {
    state.popup = bool;
  },
  USER_ID: function USER_ID(state, uid) {
    state.id = uid;
  },
  USER_NAME: function USER_NAME(state, init) {
    state.name = init;
  },
  USER_AVATAR: function USER_AVATAR(state, url) {
    state.avatar = url;
  },
  LOGIN_STATE: function LOGIN_STATE(state, bool) {
    state.loginState = bool;
  },
  REPORT_STATE: function REPORT_STATE(state, bool) {
    state.reportState = bool;
  },
  USER_LIKE_MUSIC: function USER_LIKE_MUSIC(state, bool) {
    state.userLikeMusic = bool;
  }
};
var actions = {
  // 用户粉丝
  getFansFn: function getFansFn(_ref, data) {
    var commit, state, res;
    return regeneratorRuntime.async(function getFansFn$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            commit = _ref.commit, state = _ref.state;
            _context.next = 3;
            return regeneratorRuntime.awrap((0, _login.getFans)(data));

          case 3:
            res = _context.sent;

          case 4:
          case "end":
            return _context.stop();
        }
      }
    });
  },
  // 用户关注
  getFollowFn: function getFollowFn(_ref2, data) {
    var commit, state, res;
    return regeneratorRuntime.async(function getFollowFn$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            commit = _ref2.commit, state = _ref2.state;
            _context2.next = 3;
            return regeneratorRuntime.awrap((0, _login.getFollow)(data));

          case 3:
            res = _context2.sent;
            return _context2.abrupt("return", res.data.follow.length > 0 ? res.data.follow : '暂无关注');

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    });
  },
  // 收藏 / 取消 歌单
  getSubscribeFn: function getSubscribeFn(_ref3, data) {
    var commit, state, dispatch, res;
    return regeneratorRuntime.async(function getSubscribeFn$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            commit = _ref3.commit, state = _ref3.state, dispatch = _ref3.dispatch;
            _context3.next = 3;
            return regeneratorRuntime.awrap((0, _login.getSubscribe)(data));

          case 3:
            res = _context3.sent;

            if (!(res.data.code == 200)) {
              _context3.next = 6;
              break;
            }

            return _context3.abrupt("return", dispatch('getDynamicFn', {
              id: data.id
            }));

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    });
  },
  // 歌单详情动态 --> 调用后可获取歌单详情动态部分,如评论数,是否收藏,播放数
  getDynamicFn: function getDynamicFn(_ref4, data) {
    var commit, state, res;
    return regeneratorRuntime.async(function getDynamicFn$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            commit = _ref4.commit, state = _ref4.state;
            _context4.next = 3;
            return regeneratorRuntime.awrap((0, _ranking.getDynamic)(data.id));

          case 3:
            res = _context4.sent;
            return _context4.abrupt("return", res.data);

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    });
  },
  // 喜欢的音乐
  getLikeListFn: function getLikeListFn(_ref5, data) {
    var commit, state, res;
    return regeneratorRuntime.async(function getLikeListFn$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            commit = _ref5.commit, state = _ref5.state;
            _context5.next = 3;
            return regeneratorRuntime.awrap((0, _ranking.getLikeList)(data));

          case 3:
            res = _context5.sent;
            return _context5.abrupt("return", res.data);

          case 5:
          case "end":
            return _context5.stop();
        }
      }
    });
  },
  // 选择音乐：喜欢 或 取消喜欢
  chooseMusicFn: function chooseMusicFn(_ref6, data) {
    var commit, state, res;
    return regeneratorRuntime.async(function chooseMusicFn$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            commit = _ref6.commit, state = _ref6.state;
            _context6.next = 3;
            return regeneratorRuntime.awrap((0, _ranking.getLikeMusic)(data));

          case 3:
            res = _context6.sent;
            return _context6.abrupt("return", res);

          case 5:
          case "end":
            return _context6.stop();
        }
      }
    });
  },
  // 用户动态
  getUserdynamicFn: function getUserdynamicFn(_ref7, data) {
    var commit, state, res;
    return regeneratorRuntime.async(function getUserdynamicFn$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            commit = _ref7.commit, state = _ref7.state;
            _context7.next = 3;
            return regeneratorRuntime.awrap((0, _login.getUserdynamic)(data));

          case 3:
            res = _context7.sent;
            return _context7.abrupt("return", res.data.size == 0 ? '暂无动态' : res.data);

          case 5:
          case "end":
            return _context7.stop();
        }
      }
    });
  }
};
var loginStore = {
  namespaced: true,
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions
};
var _default = loginStore;
exports["default"] = _default;