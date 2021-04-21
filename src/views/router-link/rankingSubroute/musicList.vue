<!-- 
    排行榜关联路由（并非子路由）
-->
<template>
    <section class="music-list">
        <musicPage></musicPage>
    </section>
</template>

<script>
    import musicPage from '@/private/musicPage'
    import { timeDate } from '@/utils/'

    import { createNamespacedHelpers } from 'vuex'
    const loginStore = createNamespacedHelpers('loginStore')
    export default {
        name: 'musicList',
        components: {
            musicPage,
        },
        data() {
            return {}
        },
        created() {
            this.id = this.$route.params.id
            // this.getLikeListFn(this.id).then(res => {
            //     this.USER_LIKE_MUSIC(res)
            // })
        },
        methods: {
            ...loginStore.mapMutations(['USER_LIKE_MUSIC']),
            ...loginStore.mapActions(['getLikeListFn']),
        },
    }
</script>

<style lang="less" scoped></style>
