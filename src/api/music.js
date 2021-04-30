// 音乐播放
import axios from 'axios'
// 获取音乐 url
export const getSongUrl = params => axios.get(`/song/url`, { params })

// 音乐是否可用
export const getCheckMusic = params => axios.get(`/check/music`, { params })

// 获取用户播放记录
export const getUserRecord = params => axios.get(`/user/record`, { params })

// 获取歌词
export const getLyric = params => axios.get(`/lyric`, { params })
