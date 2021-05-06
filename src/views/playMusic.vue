<!-- 
    播放音乐
-->
<template>
    <section class="play">
        <div class="content">
            <div class="left">
                <div v-if="musicInit" class="introduce">
                    <p class="img" @click="playInterface">
                        <i class="iconfont icon-xiangshangshouqi"></i>
                        <img :src="musicInit.al.picUrl" alt="" />
                    </p>
                    <div>
                        <p>{{ musicInit.name }}</p>
                        <p>{{ musicInit.ar[0].name }}</p>
                    </div>
                    <div>
                        <p>{{ musicPlayingTime }}</p>
                        <p>{{ totalDurationOfMusic }}</p>
                    </div>
                </div>
            </div>
            <div class="center">
                <VueAudio :http="http"></VueAudio>
            </div>
            <div class="right">
                <div v-if="musicInit" class="volume">
                    <i class="iconfont icon-lababucuodsf-copy" v-if="volume" @click="mute"></i>
                    <i v-else class="iconfont icon-jingyin" @click="setVolume"></i>
                    <el-slider :value="volume" :format-tooltip="formatTooltip"></el-slider>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import Bus from '@/utils/bus.js'
    import storage from 'good-storage'
    import { getSongDetail } from '@/api/songsheet'
    import { getSongUrl, getCheckMusic, getUserRecord } from '@/api/music'
    import { createNamespacedHelpers } from 'vuex'
    const playMusicStore = createNamespacedHelpers('playMusicStore')
    export default {
        name: 'playMusic',
        data() {
            return {
                show: false,
                musicUrl: '',
                musicInit: '',
                http: '',
                musicMaxTime: 0,
                currentMusicTime: 0,
            }
        },
        created() {
            Bus.$on('play', id => {
                // 先判断当前 音乐是否可用
                getCheckMusic({ id: id }).then(res => {
                    // 当前音乐可用
                    if (res.data.success) {
                        getSongUrl({ id: id }).then(res => {
                            this.musicUrl = res.data.data[0]
                        })
                        getSongDetail({ ids: id }).then(res => {
                            this.musicInit = res.data.songs[0]
                            this.http = `https://music.163.com/song/media/outer/url?id=${this.musicInit.id}.mp3`
                        })
                        this.MUSCI_PLAY_ID(id)
                    } else {
                        this.$message({
                            showClose: true,
                            message: res.data.msg,
                            type: 'warning',
                        })
                    }
                })
            })
        },
        methods: {
            ...playMusicStore.mapMutations(['VOLUME', 'MUSCI_PLAY_ID', 'MUSIC_PAGE_STATE']),
            mute() {
                this.VOLUME(0)
            },
            setVolume() {
                this.VOLUME(50)
            },
            playInterface() {
                this.MUSIC_PAGE_STATE(true)
            },
            formatTooltip(value) {
                this.VOLUME(value)
            },
        },
        computed: {
            ...playMusicStore.mapState(['volume', 'musicList', 'musicPlayingTime', 'totalDurationOfMusic']),
        },
    }
</script>

<style lang="less" scoped>
    @import '../assets/style/mixins.less';
    .play {
        height: 70px;
        background-color: #f9f9f9;
        width: 100%;
        position: relative;
        .content {
            padding: 10px 20px;
            z-index: 999;
            .flex();
            .center {
                width: 40%;
            }
            .left {
                width: 30%;
                .introduce {
                    display: flex;
                    .img {
                        position: relative;
                        i {
                            position: absolute;
                            left: 30%;
                            top: 30%;
                            opacity: 0;
                        }
                        img {
                            width: 50px;
                            margin-right: 5px;
                            border-radius: 5px;
                        }
                        &:hover {
                            cursor: pointer;
                            i {
                                opacity: 1;
                                z-index: 999;
                            }
                            img {
                                filter: blur(0.14286rem);
                            }
                        }
                    }
                }
            }
            .right {
                width: 30%;
                display: flex;
                align-items: center;
                justify-content: center;
                .volume {
                    width: 30%;
                    display: flex;
                    align-items: center;
                    i {
                        font-size: 20px;
                        &:hover {
                            cursor: pointer;
                        }
                    }
                    /deep/ .el-slider {
                        margin-left: 10px;
                        width: 100%;
                    }
                }
            }
        }
    }
</style>
