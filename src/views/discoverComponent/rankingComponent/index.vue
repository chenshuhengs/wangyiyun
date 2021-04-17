<!-- 
    排行榜
-->
<template>
    <section class="ranking">
        <h5></h5>
        <contentList :list="listRecommend" :artistToplist="artistToplist"></contentList>
    </section>
</template>

<script>
    import { getranking } from '@/api/ranking'
    import contentList from './contentList'
    export default {
        name: 'rankingComponent',
        components: {
            contentList,
        },
        data() {
            return {
                listRecommend: [],
                artistToplist: {}, //歌手榜
            }
        },
        created() {
            // 排行榜歌单类型: 歌手榜 和 其他类型的 榜单数据是分开的
            getranking().then(res => {
                this.artistToplist = res.data.artistToplist
                this.list = res.data.list
                this.listRecommend = this.list.slice(0, 4)
            })
        },
    }
</script>

<style lang="less" scoped></style>
