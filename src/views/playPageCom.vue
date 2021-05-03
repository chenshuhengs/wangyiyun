<!-- 
    正在播放的页面
-->
<template>
    <transition name="fade">
        <section class="music" v-if="musicPageState" :class="[musicPageState ? 'show' : '']">
            <!-- <i class="iconfont icon-direction-down" @click="closePage"></i> -->
            <div class="content">
                <!-- 播放音乐的顶部 音乐信息 和 歌词部分 -->
                <div class="top">
                    <div class="left">
                        <img class="play-bar-support" src="@/assets/image/play-bar-support.png" />
                        <img :class="['play-bar', musicPlayState ? 'pointer_motion' : 'pointer_stop']" src="@/assets/image/play-bar.png" />
                        <div class="circular">
                            <div :class="['img-outer', musicPlayState ? 'paused' : 'stop']"><img :src="imgUrl" alt="" /></div>
                        </div>
                    </div>
                    <div class="right">
                        <lyricCom :lyric="lyric" :lyricInit="lyricInit"></lyricCom>
                    </div>
                </div>
                <div class="bottom"></div>
            </div>
        </section>
    </transition>
</template>

<script>
    import { getLyric } from '@/api/music'
    import { getSongDetail } from '@/api/songsheet'
    import { createNamespacedHelpers } from 'vuex'
    const playMusicStore = createNamespacedHelpers('playMusicStore')
    export default {
        name: 'playPageCom',
        data() {
            return {
                show: true,
                lyric: {}, //歌词
                lyricInit: [], //歌曲详情
                imgUrl: '',
                musicName: '',
            }
        },
        computed: {
            ...playMusicStore.mapState(['musicPlayId', 'musicPlayState', 'musicPageState']),
        },
        methods: {
            ...playMusicStore.mapMutations(['MUSIC_PAGE_STATE']),
            // closePage() {
            //     this.MUSIC_PAGE_STATE(false)
            // },
        },
        watch: {
            musicPlayId(newData, oldData) {
                getLyric({ id: newData }).then(res => {
                    this.lyric = res.data
                })
                getSongDetail({ ids: newData }).then(res => {
                    this.imgUrl = res.data.songs[0].al.picUrl
                    this.lyricInit = res.data.songs
                })
            },
        },
    }
</script>

<style lang="less" scoped>
    .music {
        position: fixed;
        bottom: -830px;
        left: 0;
        width: 100%;
        background: #fff;
        z-index: 999;
        overflow: hidden;
        overflow-y: auto;
        height: calc(~'100% - 120px');
        padding: 0 30px;
        &.show {
            animation: 0.5s fadeIn2 forwards;
            @keyframes fadeIn2 {
                0% {
                    transform: translateY(0px);
                }
                100% {
                    transform: translateY(-899px);
                }
            }
        }
        &.fade-leave-active {
            animation: 0.5s fadeIn1 forwards;
            @keyframes fadeIn1 {
                0% {
                    transform: translateY(-899px);
                }
                100% {
                    transform: translateY(0px);
                }
            }
        }
        .content {
            max-width: 840px;
            height: 100%;
            margin: 0 auto;
            position: relative;
            .top {
                height: 100%;
                display: flex;
                // align-items: center;
                .left {
                    width: 50%;
                    .play-bar-support {
                        position: absolute;
                        left: 22%;
                        top: -10px;
                        width: 40px;
                        z-index: 100;
                    }
                    .play-bar {
                        position: absolute;
                        left: 20%;
                        top: -20px;
                        width: 150px;
                        transform-origin: 0 0;
                        transform: rotate(-30deg);
                        transition: all 0.3s;
                        z-index: 300;
                        &.pointer_motion {
                            transform: rotate(5deg);
                        }
                    }
                    .circular {
                        position: absolute;
                        width: 300px;
                        height: 300px;
                        background: #e6e5e6;
                        left: calc(~'(50% - 300px) / 2');
                        top: 130px;
                        border-radius: 50%;
                        padding: 10px;
                        .img-outer {
                            background: #000;
                            z-index: 999;
                            width: 100%;
                            height: 100%;
                            border-radius: 50%;
                            background: linear-gradient(-45deg, #333540, #070708, #333540);
                            padding: 50px;
                            animation: rotate 20s linear infinite;
                            &.stop {
                                animation-play-state: paused;
                            }
                            &.paused {
                                @keyframes rotate {
                                    0% {
                                        -webkit-transform: rotate(0deg);
                                    }
                                    50% {
                                        -webkit-transform: rotate(180deg);
                                    }
                                    100% {
                                        -webkit-transform: rotate(360deg);
                                    }
                                }
                            }
                            img {
                                width: 100%;
                                border-radius: 50%;
                                border: 1px solid #000;
                            }
                        }
                    }
                }
                .right {
                    width: 50%;
                    height: 60%;
                    margin-top: 60px;
                    text-align: center;
                }
            }
        }
    }
</style>
