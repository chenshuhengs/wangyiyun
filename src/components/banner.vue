<template>
    <section class="banner">
        <el-carousel :interval="4000" type="card" :height="`${height}px`">
            <el-carousel-item v-for="(item, index) in bannerList" :key="index">
                <div class="content">
                    <img :src="item.imageUrl ? item.imageUrl : item.pic" alt="" />
                    <musicType :typeTitle="item.typeTitle"></musicType>
                </div>
            </el-carousel-item>
        </el-carousel>
    </section>
</template>

<script>
    import { throttle } from 'lodash-es'
    import musicType from '@/private/musicType'
    import bannerWidth from '@/utils/bannerWidth.js'
    export default {
        name: 'Banner',
        props: {
            bannerList: {
                type: Array,
            },
        },
        components: {
            musicType,
        },
        data() {
            return {
                height: 0,
            }
        },
        created() {
            this.height = bannerWidth(document.body.clientWidth)
        },
        methods: {
            calc() {
                this.height = bannerWidth(document.body.clientWidth)
            },
        },
        mounted() {
            window.addEventListener('resize', throttle(this.calc, 300))
        },
    }
</script>

<style lang="less" scoped>
    .banner {
        .content {
            width: 100%;
            height: 100%;
            position: relative;
            img {
                width: 100%;
                height: 100%;
                overflow: hidden;
            }
        }
        .el-carousel__item {
            border-radius: 10px;
        }
    }
</style>
