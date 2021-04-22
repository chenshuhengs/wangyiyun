// 排行榜
import axios from 'axios'

// 歌单榜
export const getranking = () => axios.get('/toplist/detail')

// 歌单详情
export const getPlaylist = params => axios.get(`/playlist/detail?id=${params}`)

// 歌单详情动态
export const getDynamic = params => axios.get(`/playlist/detail/dynamic?id=${params}`)

// 喜欢的音乐列表
export const getLikeList = params => axios.get(`/likelist?uid=${params}`)

// 选择音乐 ： 喜欢/不喜欢
export const getLikeMusic = params => axios.get(`/like?id=${params.id}&like=${params.like}`)

// mv 播放地址
export const getMvAddress = params => axios.get(`/mv/url?id=${params}`)

// 获取 mv 数据
export const getMvdetail = params => axios.get(`/mv/detail?mvid=${params}`)

//获取 mv 点赞转发评论数数据
export const getDetailInfo = params => axios.get(`/mv/detail/info?mvid=${params}`)

// 获取点赞过的视频
export const getPlaylistMylike = params => axios.get(`/playlist/mylike`)

// 资源点赞( MV,电台,视频)
export const getResourceLike = params => axios.get(`/resource/like?t=${params.t}&type=${params.type}&id=${params.id}`)

// 收藏的 MV 列表
export const getMvSublist = params => axios.get(`/mv/sublist`)

// 收藏/取消收藏 MV
export const getMvSub = params => axios.get(`/mv/sub?mvid=${params.id}&t=${params.t}`)

// 发送/删除评论
export const getComment = params =>
    axios.get(`/comment?t=${params.t}&type=${params.type}&id=${params.id}&content=${params.content}&commentId=${params.commentId}`)

// mv 评论
export const getCommentMv = params => axios.get(`/comment/mv?id=${params.id}`)

// 给评论点赞
export const getCommentLike = params => axios.get(`/comment/like?id=${params.id}&cid=${params.cid}&t=${params.t}&type=${params.type}`)
