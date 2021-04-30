<template>
    <section class="scroller" ref="scroller">
        123123123123
        <slot></slot>
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
                    console.log(this.lyriclist)
                },
                immediate: true,
            },
        },
        methods: {},
    }
</script>

<style lang="less" scoped>
    .scroller {
        height: 100%;
    }
</style>
