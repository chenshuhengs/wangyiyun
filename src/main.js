//基础
import Vue from 'vue'
import router from './router'
//根元素
import App from './App.vue'
import store from './store'
import './requestConfig/axios'
// 初始化样式
import '@/assets/style/app.less'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
import VueLazyload from 'vue-lazyload'
// 注册公共组件
import componentFn from '@/utils/componentFn'
const EMPTY_IMG = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

Vue.use(ElementUI)
Vue.use(componentFn)
Vue.use(VueLazyload, {
    loading: EMPTY_IMG,
    error: EMPTY_IMG,
})

Vue.config.productionTip = false

new Vue({ store, router, render: h => h(App) }).$mount('#app')
