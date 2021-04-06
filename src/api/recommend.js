// 推荐 各类音乐 列表
import axios from 'axios'

export const getRecommendMusic = () => axios.get(`/personalized?limit=10`)
