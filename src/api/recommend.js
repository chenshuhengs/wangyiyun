// 推荐 各类音乐 列表
import axios from 'axios'

//! 个性推荐 API
// 推荐MV
export const getMv = () => axios.get('/personalized/mv')
// 独家放送
export const getSole = () => axios.get(`/personalized/privatecontent`)
// 推荐歌单
export const getRecommendMusic = () => axios.get(`/personalized?limit=10`)
// 最新音乐
export const getNewMusice = limit => axios.get(`/personalized/newsong?limit=12`)

// 主播电台
export const getDj = () => axios.get('/dj/program/detail')
