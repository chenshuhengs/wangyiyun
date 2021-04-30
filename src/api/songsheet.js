import axios from 'axios'
// 歌单

// 歌单类别
export const getSongListTypes = () => axios.get('/playlist/hot')
// 全部歌单
export const getWholeSong = () => axios.get('/playlist/catlist')
// 精品歌单列表
export const getBoutiqueList = params => axios.get('/top/playlist', { params })
//精品歌单类型
export const getTagList = params => axios.get('/playlist/highquality/tags', { params })
// 精品歌单
export const getBoutiqueSong = params => axios.get('/top/playlist/highquality', { params })

// 歌单收藏者
export const getPlaylistSubscribers = params => axios.get('/playlist/subscribers', { params })

// 获取歌曲详情
export const getSongDetail = params => axios.get('/song/detail', { params })
