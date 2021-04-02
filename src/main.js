//基础
import Vue from 'vue'
import router from './router'
//根元素
import App from './App.vue'
Vue.config.productionTip = false


new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
