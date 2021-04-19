<!-- 
    排行榜关联路由（并非子路由）
-->
<template>
    <section class="music-list"></section>
</template>

<script>
    import { getPlaylist, getLikeList } from '@/api/ranking'
    export default {
        name: 'musicList',
        data() {
            return {}
        },
        created() {
            this.id = this.$route.params.id
            getPlaylist(this.id).then(res => {
                console.log(res)
            })
            getLikeList(this.id).then(res => {
                console.log(res)
            })
        },
    }
</script>

<style lang="less" scoped>
    .music-list {
    }
</style>
