<template>
    <section class="banner">
        <el-carousel :interval="4000" type="card" height="250px">
            <el-carousel-item v-for="(item, index) in bannerList" :key="index">
                <div class="content">
                    <img :src="item.imageUrl" alt="" />
                    <musicType :typeTitle="item.typeTitle"></musicType>
                </div>
            </el-carousel-item>
        </el-carousel>
    </section>
</template>

<script>
    import musicType from '@/private/musicType'
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
            return {}
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
