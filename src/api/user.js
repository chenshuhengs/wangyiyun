import axios from 'axios'

// 获取用户详情
export const getUserDetail = params => axios.get(`/user/detail?uid=${params.id}`)

// 获取用户歌单
export const getUserPlaylist = params => axios.get(`/user/playlist?uid=${params.id}`)

// 关注/取消关注用户
export const getFollow = params => axios.get(`/follow?id=${params.id}&t=${params.t}`)

// 用户动态
export const getUserEvent = params => axios.get(`/user/event?uid=${params.id}&limit=${params.limit}`)

// 用户关注
export const getUserFollows = params => axios.get(`/user/follows?uid=${params.id}&offset=${params.offset}`)

// 粉丝
export const getUserfolloweds = params => axios.get(`/user/followeds?uid=${params.id}`)
