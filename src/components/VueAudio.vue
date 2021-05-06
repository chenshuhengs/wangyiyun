<template>
    <section class="audio">
        <!-- 进度条 -->
        <div class="progress">
            <!-- 进度条 -->
            <el-slider v-model="sliderTime" height="5" @change="changeCurrentTime" :format-tooltip="formatProcessToolTip"></el-slider>
        </div>
        <div class="top">
            <div class="icon">
                <i class="iconfont icon-shangyishou"></i>
                <i class="iconfont icon-ziyuan1 bofang" @click="startPlayOrPause" v-if="!audio.playing"></i>
                <i v-else class="iconfont icon-zantinghahah bofang" @click="startPlayOrPause"></i>
                <i class="iconfont icon-xiayishou"></i>
            </div>
        </div>
        <audio ref="audio" autoplay @pause="onPause" @play="onPlay" @timeupdate="onTimeupdate" @loadedmetadata="onLoadedmetadata" :src="http"></audio>
    </section>
</template>

<script>
    import { createNamespacedHelpers } from 'vuex'
    const playMusicStore = createNamespacedHelpers('playMusicStore')
    export default {
        name: 'VueAudio',
        props: {
            http: {
                type: String,
            },
        },
        data() {
            return {
                sliderTime: 0,
                audio: {
                    // 该字段是音频是否处于播放状态的属性
                    playing: false,
                    // 音频当前播放时长
                    currentTime: 0,
                    // 音频最大播放时长
                    maxTime: 0,
                },
            }
        },
        methods: {
            ...playMusicStore.mapMutations(['MUSIC_PLAY_STATE', 'MUSIC_PLAYING_TIME', 'TOTAL_DURATION_OF_MUSIC']),
            // 播放当前播放的音乐
            play() {
                this.audio.playing = true
                this.$refs.audio.play()
            },
            // 暂停当前播放的音乐
            pause() {
                this.audio.playing = false
                this.$refs.audio.pause()
            },
            // 播放
            onPlay() {
                this.audio.playing = true
                this.MUSIC_PLAY_STATE(true)
            },
            // 暂停
            onPause() {
                this.audio.playing = false
                this.MUSIC_PLAY_STATE(false)
            },
            // 控制音频的播放与暂停
            startPlayOrPause() {
                if (this.http) {
                    this.audio.playing ? this.pause() : this.play()
                } else {
                    this.$message({
                        message: '暂无可播放的音乐',
                        type: 'warning',
                    })
                }
            },
            onTimeupdate(event) {
                this.audio.currentTime = parseInt(event.target.currentTime)
                this.sliderTime = parseInt((this.audio.currentTime / this.audio.maxTime) * 100)
                this.audio.currentTime ? this.MUSIC_PLAYING_TIME(realFormatSecond(parseInt(event.target.currentTime))) : ''
            },
            onLoadedmetadata(event) {
                this.audio.maxTime = parseInt(event.target.duration)
                this.audio.maxTime ? this.TOTAL_DURATION_OF_MUSIC(realFormatSecond(parseInt(event.target.duration))) : ''
            },
            formatProcessToolTip(index = 0) {
                index = parseInt((this.audio.maxTime / 100) * index)
                return '进度条: ' + realFormatSecond(index)
            },
            changeCurrentTime(index) {
                this.$refs.audio.currentTime = parseInt((index / 100) * this.audio.maxTime)
            },
        },
        computed: {
            ...playMusicStore.mapState(['lyriclist']),
        },
    }
    // 将整数转换成 时：分：秒的格式
    function realFormatSecond(second = 0) {
        var secondType = typeof second

        if (secondType === 'number' || secondType === 'string') {
            second = parseInt(second)

            var hours = Math.floor(second / 3600)
            second = second - hours * 3600
            var mimute = Math.floor(second / 60)
            second = second - mimute * 60

            return hours + ':' + ('0' + mimute).slice(-2) + ':' + ('0' + second).slice(-2)
        } else {
            return '0:00:00'
        }
    }
</script>

<style lang="less" scoped>
    @import '../assets/style/mixins.less';
    .audio {
        width: 100%;
        height: 50px;
        .progress {
            position: absolute;
            left: 0;
            top: -5px;
            z-index: 0;
            width: 100%;
            background-color: rgba(218, 209, 209, 0);
            box-shadow: none;
            /deep/ .el-slider__runway {
                z-index: 999;
                margin-top: 5px;
                background-color: #e0e0e0;
            }
            /deep/ .el-slider__bar {
                background: rgb(221, 9, 9);
            }
            /deep/ .el-slider__button {
                z-index: 999 !important;
                border: none;
                background: rgb(241, 85, 85);
            }
        }
        .top {
            height: 50px;
            .flex(nowrap,center);
            align-items: center;
            .icon {
                i {
                    font-size: 24px;
                    &:hover {
                        cursor: pointer;
                    }
                    &.bofang {
                        margin: 0 20px;
                        padding: 10px 12px;
                        background: red;
                        border-radius: 50%;
                        color: #fff;
                        font-size: 18px;
                    }
                }
            }
        }
    }
</style>
