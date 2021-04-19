// 登录
import axios from 'axios'
export const login = params => axios.post('/login/cellphone', params)

// 用户动态
export const getUserdynamic = params => axios.get(`/user/event?uid=${params}`)

// 用户关注
export const getFollow = params => axios.get(`/user/follows?uid=${params}`)

// 粉丝
export const getFans = params => axios.get(`/user/followeds?uid=${params}`)
