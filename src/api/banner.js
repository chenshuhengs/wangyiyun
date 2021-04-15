import axios from 'axios'

// 个性推荐
export const getBanner = () => axios.get('/banner')

// 主播电台
export const getRecommendBanner = () => axios.get('/dj/banner')
