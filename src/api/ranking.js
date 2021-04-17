// 排行榜
import axios from 'axios'

// 歌单榜
export const getranking = () => axios.get('/toplist/detail')

// 歌单详情
export const getPlaylist = params => axios.get(`/playlist/detail?id=${params}`)
