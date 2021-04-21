// 登录
import axios from 'axios'
export const login = params => axios.post('/login/cellphone', params)

// 用户动态
export const getUserdynamic = params => axios.get(`/user/event?uid=${params}`)

// 用户关注
export const getFollow = params => axios.get(`/user/follows?uid=${params}`)

// 粉丝
export const getFans = params => axios.get(`/user/followeds?uid=`)

// 收藏歌单 / 取消收藏
export const getSubscribe = params => axios.get(`/playlist/subscribe?t=${params.type}&id=${params.id}`)
