"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vuex = _interopRequireDefault(require("vuex"));

var _loginStore = _interopRequireDefault(require("./modules/loginStore"));

var _singerStore = _interopRequireDefault(require("./modules/singerStore"));

var _discoverStore = _interopRequireDefault(require("./modules/discoverStore"));

var _anchorDjStore = _interopRequireDefault(require("./modules/anchorDjStore"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].use(_vuex["default"]);

var _default = new _vuex["default"].Store({
  modules: {
    loginStore: _loginStore["default"],
    discoverStore: _discoverStore["default"],
    anchorDjStore: _anchorDjStore["default"],
    singerStore: _singerStore["default"]
  },
  // 生产环境下 开启严格模式
  strict: process.env.NODE_ENV !== 'production'
});

exports["default"] = _default;