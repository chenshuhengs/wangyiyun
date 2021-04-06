import axios from 'axios'
import Vue from 'vue'
import { Loading } from 'element-ui'

axios.create({
    timeout: 2500,
})
axios.defaults.baseURL = 'http://localhost:4000'
axios.defaults.withCredentials = true
let loading = null
// 添加请求拦截器
axios.interceptors.request.use(
    config => {
        loading = Loading.service({
            target: 'body',
            background: 'transparent',
            text: '载入中',
        })
        return config
    },
    error => {
        return Promise.reject(error)
    },
)

// 添加响应拦截器
axios.interceptors.response.use(
    response => {
        if (response.status === 200) {
            if (loading) {
                loading.close()
            }
            return response
        }
    },
    error => {
        // 对响应错误做点什么
        return Promise.reject(error)
    },
)

Vue.prototype.$axios = axios
Vue.prototype.$get = axios.get
Vue.prototype.$post = axios.post
Vue.prototype.$put = axios.put
Vue.prototype.$delete = axios.delete
