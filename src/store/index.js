import Vue from 'vue'
import Vuex from 'vuex'
import loginStore from './modules/loginStore'
import singerStore from './modules/singerStore'
import discoverStore from './modules/discoverStore'
import anchorDjStore from './modules/anchorDjStore'
import playMusicStore from './modules/playMusicStore'
Vue.use(Vuex)

export default new Vuex.Store({
    modules: { loginStore, discoverStore, anchorDjStore, singerStore, playMusicStore },
    // 生产环境下 开启严格模式
    strict: process.env.NODE_ENV !== 'production',
})
