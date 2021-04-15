<!-- 
    歌单
-->
<template>
    <section class="songsheet">
        <!-- 头部 精品歌单 -->
        <transition name="fade">
            <qualitySongList v-if="fineMusic.more"></qualitySongList>
        </transition>
        <tabBar :tags="tags" @tabClick="pageJump"></tabBar>
        <section class="content">
            <contentList :musicList="musicList"></contentList>
        </section>
        <!-- 分页 -->
        <paging :total="total" @pageJump="pageJump"></paging>
    </section>
</template>

<script>
    import tabBar from './tabBar'
    import Bus from '@/utils/bus.js'
    import contentList from './contentList'
    import qualitySongList from './qualitySongList'
    import { getSongListTypes } from '@/api/songsheet.js'
    import { createNamespacedHelpers } from 'vuex'
    const discoverStore = createNamespacedHelpers('discoverStore')
    export default {
        name: 'songSheetComponent',
        components: {
            tabBar,
            contentList,
            qualitySongList,
        },
        data() {
            return {
                tags: [],
                playlist: {}, //精品歌单
                musicList: [],
            }
        },
        created() {
            Bus.$on('contentList', name => {
                this.getBoutiqueList({
                    cat: name,
                    limit: 40,
                    offset: 1,
                }).then(res => {
                    this.musicList = res.playlists
                })
            })
            this.getBoutiqueSong()
            this.getBoutiqueList({
                cat: this.activeLable,
                limit: 40,
                offset: 1,
            }).then(res => {
                this.musicList = res.playlists
            })
            getSongListTypes().then(res => {
                this.tags = res.data.tags
            })
        },
        methods: {
            ...discoverStore.mapActions(['getBoutiqueSong', 'getBoutiqueList']),
            // 分页
            pageJump(page = 1) {
                this.getBoutiqueList({
                    limit: 40,
                    offset: page,
                    cat: this.activeLable,
                }).then(res => {
                    this.musicList = res.playlists
                })
            },
            // tabClick() {},
        },
        computed: {
            ...discoverStore.mapState(['total', 'fineMusic', 'activeLable']),
        },
        mounted() {},
    }
</script>

<style lang="less" scoped>
    .songsheet {
        width: 100%;
        height: 100%;
    }
</style>
