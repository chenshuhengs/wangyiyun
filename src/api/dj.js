// 主播电台
import axios from 'axios'

// 电台类型
export const getDjCatelist = () => axios.get(`/dj/catelist`)

// 电台 分类
export const getDjCate = params => axios.get(`/dj/recommend/type?type=${params}`)

// 付费精品
export const getDjToplist = params => axios.get(`/dj/paygift?limit=${params}`)

// 个性推荐
export const getDjPersonalize = params => axios.get(`/dj/personalize/recommend?limit=${params}`)

// 创作翻唱
export const getDjRadio = params => axios.get(`/dj/radio/hot?cateId=2001&limit=${params}`)
