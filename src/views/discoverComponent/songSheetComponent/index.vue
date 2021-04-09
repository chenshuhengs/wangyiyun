<!-- 
    歌单
-->
<template>
    <section class="songsheet">
        <!-- 头部 精品歌单 -->
        <qualitySongList></qualitySongList>
        <tabBar :tags="tags"></tabBar>
    </section>
</template>

<script>
    import Popup from './Popup'
    import tabBar from './tabBar'
    import { createNamespacedHelpers } from 'vuex'
    import qualitySongList from '@/private/qualitySongList'
    import { getplaylist, getBoutiqueSong, getSongListTypes } from '@/api/songsheet.js'

    const discoverStore = createNamespacedHelpers('discoverStore')
    export default {
        name: 'songSheetComponent',
        components: {
            tabBar,
            qualitySongList,
        },
        data() {
            return {
                tags: [],
                getBoutiqueSong: [], //精品歌单
            }
        },
        created() {
            getplaylist().then(res => {
                // console.log(res)
            })
            getSongListTypes().then(res => {
                this.tags = res.data.tags
            })
            getBoutiqueSong().then(res => {
                // console.log(res.data)
            })
        },
        computed: {
            ...discoverStore.mapState(['activeLable']),
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
