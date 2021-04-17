<template>
    <section class="music-list">123123</section>
</template>

<script>
    import { getPlaylist } from '@/api/ranking'
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
        },
    }
</script>

<style lang="less" scoped></style>
