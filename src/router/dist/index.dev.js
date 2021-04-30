"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

_vue["default"].use(_vueRouter["default"]);

var originalPush = _vueRouter["default"].prototype.push;

_vueRouter["default"].prototype.push = function push(location) {
  return originalPush.call(this, location)["catch"](function (err) {
    return err;
  });
};

var routes = [{
  path: '/',
  redirect: '/discover',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/views/layout'));
    });
  },
  children: [{
    path: '/discover',
    name: 'discoverComponent',
    redirect: '/discover/personality',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('@/views/discoverComponent/'));
      });
    },
    meta: {
      id: 1,
      show: true,
      name: '发现音乐'
    },
    children: [{
      path: '/discover/personality',
      name: 'personalityComponent',
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require('@/views/discoverComponent/personalityComponent'));
        });
      },
      meta: {
        id: 1,
        show: false,
        label: '个性推荐',
        name: 'personality'
      }
    }, {
      path: '/discover/songsheet',
      name: 'songSheetComponent',
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require('@/views/discoverComponent/songSheetComponent'));
        });
      },
      meta: {
        id: 1,
        show: false,
        name: 'songsheet',
        label: '歌单'
      }
    }, {
      path: '/discover/songsheet/boutique',
      name: 'boutique',
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require('@/views/discoverComponent/songSheetComponent/boutique'));
        });
      },
      meta: {
        id: 1,
        show: false,
        name: undefined,
        label: undefined
      }
    }, {
      path: '/discover/anchor',
      name: 'anchorComponent',
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require('@/views/discoverComponent/anchorComponent'));
        });
      },
      meta: {
        id: 1,
        show: false,
        name: 'anchor',
        label: '主播电台'
      }
    }, {
      path: '/discover/ranking',
      name: 'rankingComponent',
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require('@/views/discoverComponent/rankingComponent'));
        });
      },
      meta: {
        id: 1,
        show: false,
        name: 'ranking',
        label: '排行'
      }
    }, {
      path: '/discover/singer',
      name: 'singerComponent',
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require('@/views/discoverComponent/singerComponent'));
        });
      },
      meta: {
        id: 1,
        show: false,
        name: 'singer',
        label: '歌手'
      }
    }]
  }, {
    path: '/video',
    name: 'videoComponent',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('@/views/videoComponent/'));
      });
    },
    meta: {
      id: 2,
      show: true,
      name: '视频'
    }
  }, {
    path: '/friend',
    name: 'friendComponent',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('@/views/friendComponent/'));
      });
    },
    meta: {
      id: 3,
      show: true,
      name: '朋友'
    }
  }, {
    path: '/share',
    name: 'shareComponent',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('@/views/shareComponent/'));
      });
    },
    meta: {
      id: 4,
      show: true,
      name: '直播'
    }
  }, {
    path: '/liketype/:type',
    name: 'likeTypeCom',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('@/views/router-link/anchorSubroute/likeTypeCom'));
      });
    },
    meta: {
      id: undefined,
      show: undefined,
      name: undefined
    }
  }, {
    path: '/discover/ranking/:id',
    name: 'musicList',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('@/views/router-link/rankingSubroute/musicList'));
      });
    },
    meta: {
      id: undefined,
      show: undefined,
      name: undefined
    }
  }, {
    path: '/discover/user/:key',
    name: 'user',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('@/views/router-link/user/'));
      });
    },
    meta: {
      id: undefined,
      show: undefined,
      name: undefined
    }
  }, {
    path: '/discover/follow/:id',
    name: 'followList',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('@/views/router-link/followList/'));
      });
    },
    meta: {
      id: undefined,
      show: undefined,
      name: undefined
    }
  }, {
    path: '/discover/dynamic/:id',
    name: 'dynamic',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('@/views/router-link/followList/dynamic'));
      });
    },
    meta: {
      id: undefined,
      show: undefined,
      name: undefined
    }
  }, {
    path: '/discover/singerlist',
    name: 'singerlist',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('@/views/router-link/singerlist/index.vue'));
      });
    },
    meta: {
      id: undefined,
      show: undefined,
      name: undefined
    }
  }, {
    path: '/discover/singerdetails/:id',
    name: 'singerDetails',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('@/views/router-link/singerlist/singerDetails'));
      });
    },
    meta: {
      id: undefined,
      show: undefined,
      name: undefined
    }
  }, {
    path: '/discover/exclusivebroadcast',
    name: 'exclusiveBroadcast',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('@/views/discoverComponent/personalityComponent/exclusiveBroadcast'));
      });
    },
    meta: {
      id: undefined,
      show: undefined,
      name: undefined
    }
  }]
}, {
  path: '/discover/mv/:id',
  name: 'mv',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/views/router-link/mv/'));
    });
  },
  meta: {
    id: undefined,
    show: undefined,
    name: undefined
  }
}];
var router = new _vueRouter["default"]({
  routes: routes
});
var _default = router;
exports["default"] = _default;