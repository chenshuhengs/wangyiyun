<template>
    <section class="scroller" ref="scroller">
        <header>
            <h5>{{ lyricInit[0].name }}</h5>
            <ul class="singer">
                <li v-for="(item, index) in lyricInit[0].ar" :key="index">{{ item.name }}</li>
            </ul>
        </header>
        <ul class="lyriclist" ref="lyricUL">
            <li
                v-for="(item, index) in lyriclist"
                :data-index="index"
                :style="{ color: lyricIndex === index ? 'skyblue' : '' }"
                :key="index"
                ref="lyric"
            >
                {{ item.content }}
            </li>
        </ul>
    </section>
</template>

<script>
    import BScroll from '@better-scroll/core'
    import { createNamespacedHelpers } from 'vuex'
    const playMusicStore = createNamespacedHelpers('playMusicStore')
    import lyricParser from '@/utils/lyricsScrolling'

    const defaultOptions = {
        mouseWheel: true,
        scrollY: true,
        scrollbar: true,
        probeType: 3,
    }
    export default {
        name: 'lyricCom',
        props: {
            lyric: {
                type: Object,
            },
            lyricInit: {
                type: Array,
            },
        },
        data() {
            return {
                lyriclist: [],
            }
        },
        watch: {
            lyric: {
                handler(newVal, oldVal) {
                    const { lyric, tlyric } = lyricParser(newVal)
                    this.lyriclist = lyric
                },
                deep: true,
                immediate: true,
            },
            musicPlayingTime: {
                handler(newVal, oldVal) {
                    let bs = new BScroll(this.$refs.lyricUL, defaultOptions)
                    if (newVal) {
                        for (let i = 0; i < this.lyriclist.length; i++) {
                            if (parseInt(newVal.split(':')[1] * 60) + parseInt(newVal.split(':')[2]) >= parseInt(this.lyriclist[i].time)) {
                                const index = this.$refs.lyric[i].dataset.index
                                if (i === parseInt(index)) {
                                    this.LYRIC_INDEX(i)
                                }
                            }
                        }
                    }
                },
                deep: true,
                immediate: true,
            },
        },
        methods: {
            ...playMusicStore.mapMutations(['LYRIC_INDEX']),
        },
        computed: {
            ...playMusicStore.mapState(['lyricIndex', 'musicPlayingTime']),
        },
    }
</script>

<style lang="less" scoped>
    .scroller {
        height: 100%;
        header {
            h5 {
                font-size: 22px;
                font-weight: 600;
            }
            .singer {
                display: flex;
                justify-content: center;
                height: 50px;
                line-height: 50px;

                z-index: 999;
                margin: 0;
            }
        }
        .lyriclist {
            height: 90%;
            // margin-top: 30px;
            overflow: hidden;
            overflow-y: scroll;
            text-align: center;
            line-height: 30px;
            white-space: nowrap;
            color: #757272;
            position: relative;
            mask-image: linear-gradient(
                180deg,
                rgba(255, 255, 255, 0) 0,
                rgba(255, 255, 255, 0.6) 15%,
                #fff 25%,
                #fff 75%,
                rgba(255, 255, 255, 0.6) 85%,
                rgba(255, 255, 255, 0)
            );
            &::-webkit-scrollbar {
                width: 5px;
            }
            &::-webkit-scrollbar-thumb {
                background: #ccc;
                border-radius: 5px;
            }
            &::-webkit-scrollbar-thumb:hover {
                background: #636060;
            }
        }
    }
</style>
