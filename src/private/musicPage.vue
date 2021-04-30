<template>
    <section class="musci-list">
        <div class="header">
            <div class="top">
                <div class="left">
                    <img :src="playlist.coverImgUrl" alt="" />
                </div>
                <div class="right">
                    <div>
                        <span class="title">歌单</span>
                        <span class="name">{{ playlist.name }}</span>
                    </div>
                    <div>
                        <i class="icon iconfont icon-wangyiyunyinyuemusic1193417easyiconnet"></i>
                        <a href="javascript:;" @click="one">网易云音乐</a>
                        <span>最近更新：{{ today }}</span>
                    </div>
                    <div>
                        <div class="identical">
                            <i class="iconfont icon-shoucang1" v-if="playlist.subscribed"></i>
                            <i class="iconfont icon-shoucang" v-else></i>
                            <span v-if="playlist.subscribed" @click="subscribedFn(2)">已收藏({{ Collection(playlist.subscribedCount) }})</span>
                            <span v-else @click="subscribedFn(1)">收藏({{ Collection(playlist.subscribedCount) }})</span>
                        </div>
                        <div class="identical">
                            <i class="iconfont icon-icon_device_fenxiang"></i>
                            <span>分享({{ Collection(playlist.shareCount) }})</span>
                        </div>
                        <div class="identical">
                            <i class="iconfont icon-Group-"></i>
                            <span>下载全部</span>
                        </div>
                    </div>
                    <div>
                        <span>歌曲:{{ playlist.trackCount }}</span>
                        <span>播放:{{ Collection(playlist.playCount) }}</span>
                    </div>
                    <div class="description">
                        <span>简介:{{ playlist.description }}</span>
                    </div>
                </div>
            </div>
            <div class="bottom">
                <div>
                    <span :class="[name == 1 ? 'active' : '']" @click="cutTabClick(1)">歌曲列表</span>
                    <span :class="[name == 2 ? 'active' : '']" @click="cutTabClick(2)">评论({{ playlist.commentCount }})</span>
                    <span :class="[name == 3 ? 'active' : '']" @click="cutTabClick(3)">收藏者</span>
                </div>
                <input type="text" v-model="inputvalue" style="width: 25%" placeholder="搜索歌单音乐" />
            </div>
        </div>
        <div class="content">
            <transition name="aaa">
                <songList :list="playlist.tracks" v-if="name == 1"></songList>
                <commentFn v-if="name == 2"></commentFn>
                <Collection v-if="name == 3" :id="this.id"></Collection>
            </transition>
        </div>
    </section>
</template>

<script>
    import storage from 'good-storage'
    import { minute, timeDate, playCount } from '@/utils/'
    import { createNamespacedHelpers } from 'vuex'
    import { getPlaylist, getDynamic } from '@/api/ranking'
    const loginStore = createNamespacedHelpers('loginStore')
    import Collection from '@/views/discoverComponent/rankingComponent/Subcomponents/Collection'
    import commentFn from '@/views/discoverComponent/rankingComponent/Subcomponents/commentFn'
    import songList from '@/views/discoverComponent/rankingComponent/Subcomponents/songList'
    export default {
        name: 'musicPage',
        components: {
            Collection,
            commentFn,
            songList,
        },
        data() {
            return {
                id: '',
                name: 1,
                today: '',
                show: false,
                message: '',
                timeout: null,
                playlist: '',
                inputvalue: '',
                loading: false,
                subscribed: false,
            }
        },
        created() {
            this.id = this.$route.params.id
            getPlaylist(this.id).then(res => {
                this.playlist = res.data.playlist
                this.today = timeDate(this.playlist.trackNumberUpdateTime) //时间转换
            })
            getDynamic(this.id).then(res => {
                this.subscribed = res.data.subscribed
            })

            var time1 = new Date(240979)
        },
        methods: {
            ...loginStore.mapActions(['getSubscribeFn']),
            ...loginStore.mapMutations(['LOGIN_STATE']),
            one() {
                this.$router.push({
                    path: '/discover/user/1',
                })
            },
            Collection(count) {
                return playCount(count)
            },
            cutTabClick(name) {
                this.name = name
            },
            subscribedFn(type) {
                if (storage.get('token')) {
                    this.getSubscribeFn({
                        type: type,
                        id: this.playlist.id,
                    }).then(res => {
                        this.subscribed = res.subscribed
                    })
                } else {
                    this.LOGIN_STATE(true)
                }
            },
        },
    }
</script>

<style lang="less" scoped>
    @import '../assets/style/mixins.less';
    .musci-list {
        width: 100%;
        height: 100%;
        .header {
            height: 50%;
            display: flex;
            box-sizing: border-box;
            padding: 30px 30px 0 30px;
            flex-direction: column;
            .top {
                display: flex;
                .left {
                    display: flex;
                    margin-right: 20px;
                    img {
                        width: 220px;
                        border-radius: 10px;
                    }
                }
                .right {
                    display: flex;
                    flex-direction: column;
                    div {
                        display: flex;
                        align-items: center;
                        &:nth-of-type(1) {
                            .title {
                                font-size: 14px;
                                border: 1px solid rgb(228, 15, 15);
                                padding: 0px 5px;
                                border-radius: 5px;
                                color: rgb(228, 15, 15);
                                margin-right: 10px;
                            }
                            .name {
                                font-weight: 700;
                            }
                        }
                        &:nth-of-type(2) {
                            margin: 10px 0;
                            .icon {
                                color: #fff;
                                padding: 5px 10px;
                                border-radius: 50%;
                                font-size: 20px;
                                background: red;
                            }
                            a {
                                color: rgb(63, 63, 185);
                                font-size: 16px;
                                margin: 0 10px;
                            }
                            span {
                                font-size: 16px;
                                color: #7c7474;
                            }
                        }
                        &:nth-of-type(3) {
                            .one {
                                // color: #fff;
                                display: flex;
                                align-items: center;

                                p {
                                    height: 35px;
                                    padding-right: 5px;
                                    padding-left: 20px;
                                    display: flex;
                                    font-size: 18px;
                                    align-items: center;
                                    border-top-left-radius: 30px;
                                    border-bottom-left-radius: 30px;
                                    background-color: rgba(230, 18, 18, 0.8);
                                    span:nth-of-type(1) {
                                        margin-right: 10px;
                                    }
                                    &:hover {
                                        background-color: rgb(194, 7, 7);
                                    }
                                }
                                div {
                                    height: 35px;
                                    border-top-right-radius: 30px;
                                    border-bottom-right-radius: 30px;
                                    padding: 0 10px;
                                    font-size: 21px;
                                    background-color: rgba(230, 18, 18, 0.8);
                                    &:hover {
                                        background-color: rgb(194, 7, 7);
                                    }
                                }
                            }
                            .three {
                                span {
                                    font-size: 18px;
                                }
                            }
                            .identical {
                                padding: 5px 10px;
                                margin-left: 10px;
                                border: 1px solid #e0e0e0;
                                border-radius: 30px;
                                i {
                                    font-size: 20px;
                                    margin-right: 5px;
                                }
                                span {
                                    color: #000;
                                    font-size: 18px;
                                }
                                &:hover {
                                    background: rgba(179, 172, 172, 0.3);
                                }
                            }
                        }
                        &:nth-of-type(4) {
                            span {
                                color: #4d4b4b;
                                font-size: 18px;
                                margin-right: 10px;
                            }
                        }
                        &:nth-of-type(5) {
                            span {
                                color: #4d4b4b;
                                font-size: 18px;
                            }
                        }
                    }
                    .description {
                        .twoline();
                    }
                }
            }
            .bottom {
                margin: 20px 0;
                display: flex;
                justify-content: space-between;
                div {
                    font-weight: 300;

                    font-size: 16px;
                    span {
                        padding: 5px 0;
                        margin-right: 30px;
                        &.active {
                            font-size: 18px;
                            font-weight: 600;
                            border-bottom: 3px solid red;
                        }
                    }
                }
            }
        }
    }
</style>
