<!--
    歌手
-->
<template>
    <section>
        <Screen></Screen>
    </section>
</template>

<script>
    import Screen from './screen'
    import { getArtistList, getToplistArtist } from '@/api/singer'
    export default {
        name: 'singerComponent',
        components: {
            Screen,
        },
        created() {
            getArtistList().then(res => {
                // console.log(res)
            })
            getToplistArtist().then(res => {
                // console.log(res)
            })
        },
    }
</script>

<style lang="less" scoped></style>
