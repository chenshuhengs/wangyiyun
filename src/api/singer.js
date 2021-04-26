// 歌手
import axios from 'axios'

// 歌手分类列表
export const getArtistList = params => axios.get('/artist/list', { params })

// 歌手榜
export const getToplistArtist = params => axios.get('/toplist/artist', { params })

// 热门歌手
export const getTopArtists = params => axios.get('/top/artists', { params })
