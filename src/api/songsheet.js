import axios from 'axios'
// 歌单

// 获取歌单
export const getplaylist = () => axios.get('/top/playlist')
// 歌单类别
export const getSongListTypes = () => axios.get('/playlist/hot')
// 全部歌单
export const getWholeSong = () => axios.get('/playlist/catlist')
// 精品歌单
export const getBoutiqueSong = () => axios.get('/top/playlist/highquality')
