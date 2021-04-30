// 歌手
import axios from 'axios'

// 歌手分类列表
export const getArtistList = params => axios.get('/artist/list', { params })

// 歌手榜
export const getToplistArtist = params => axios.get('/toplist/artist', { params })

// 热门歌手
export const getTopArtists = params => axios.get('/top/artists', { params })

// 歌手详情
export const getArtistDetail = params => axios.get('/artist/detail', { params })

// 获取歌手专辑
export const getArtistSlbum = params => axios.get('/artist/album', { params })

// 获取专辑内容
export const getAlbum = params => axios.get('/album', { params })

// 歌手热门50首歌曲
export const getAlbumTopSong = params => axios.get('/artist/top/song', { params })

// 获取歌手 mv
export const getAlbumMv = params => axios.get('/artist/mv', { params })

// 获取歌手详情
export const getAlbumDetail = params => axios.get('/artist/detail', { params })

// 获取相似歌手
export const getSimtAlbum = params => axios.get('/simi/artist', { params })

// 新歌速递
export const getTopSong = params => axios.get('/top/song', { params })
