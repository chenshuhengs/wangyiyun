// 登录
import axios from 'axios'
export const login = params => axios.post('/login/cellphone', params)
