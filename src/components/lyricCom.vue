<template>
    <section class="scroller" ref="scroller">
        <h5>{{ lyricInit[0].name }}</h5>
        <ul class="singer">
            <li v-for="(item, index) in lyricInit[0].ar" :key="index">{{ item.name }}</li>
        </ul>
        <ul class="lyriclist">
            <li v-for="(item, index) in lyriclist" :key="index">{{ item.content }}</li>
        </ul>
    </section>
</template>

<script>
    import BScroll from '@better-scroll/core'
    import ScrollBar from '@better-scroll/scroll-bar'
    import MouseWheel from '@better-scroll/mouse-wheel'
    import lyricParser from '@/utils/lyricsScrolling'
    BScroll.use(ScrollBar)
    BScroll.use(MouseWheel)
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
                currentLyric: '',
                lyriclist: [],
                tlyriclist: [],
            }
        },
        watch: {
            lyric: {
                handler(newVal, oldVal) {
                    const { lyric, tlyric } = lyricParser(newVal)
                    this.lyriclist = lyric
                    this.tlyriclist = tlyric
                },
                deep: true,
                immediate: true,
            },
        },
        methods: {},
    }
</script>

<style lang="less" scoped>
    .scroller {
        height: 100%;
        h5 {
            font-size: 22px;
            font-weight: 600;
        }
        .singer {
            display: flex;
            justify-content: center;
            margin: 0;
            height: 10%;
        }
        .lyriclist {
            height: 90%;
            padding: 20px 0;
            overflow: hidden;
            overflow-y: scroll;
            text-align: center;
            line-height: 30px;
            white-space: nowrap;
            color: #757272;
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
