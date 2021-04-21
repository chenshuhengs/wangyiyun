// 排行榜
import axios from 'axios'

// 歌单榜
export const getranking = () => axios.get('/toplist/detail')

// 歌单详情
export const getPlaylist = params => axios.get(`/playlist/detail?id=${params}`)

// 歌单详情动态
export const getDynamic = params => axios.get(`/playlist/detail/dynamic?id=${params}`)

// 喜欢的音乐列表
export const getLikeList = params => axios.get(`/likelist?uid=${params}`)

// 选择音乐 ： 喜欢/不喜欢
export const getLikeMusic = params => axios.get(`/like?id=${params.id}&like=${params.like}`)

// mv 播放地址
export const getMvAddress = params => axios.get(`/mv/url?id=${params}`)

export const getMvdetail = params => axios.get(`/mv/detail?mvid=${params}`)
