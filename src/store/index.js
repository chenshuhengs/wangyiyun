import Vue from 'vue'
import Vuex from 'vuex'
import discoverStore from './modules/discoverStore'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: { discoverStore },
    // 生产环境下 开启严格模式
    strict: process.env.NODE_ENV !== 'production',
})
