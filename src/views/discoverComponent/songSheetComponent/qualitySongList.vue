<!-- 
    精品歌单头部
-->
<template>
    <section class="top-bar" @click="toJump">
        <div v-for="(item, index) in fineMusic.playlists" :key="index" class="img">
            <img v-lazy="getImgUrl(item.coverImgUrl, 200)" />
            <div class="icon">
                <div class="top">
                    <Icon :size="12" name="huangguan"></Icon>
                    <span>精品歌单</span>
                </div>
                <div class="bottom">
                    <p>{{ item.name }}</p>
                    <span>{{ item.copywriter }}</span>
                </div>
                <div></div>
            </div>
        </div>
        <div class="background" :style="{ backgroundImage: `url(${fineMusic.playlists[0].coverImgUrl})` }"></div>
        <div class="background-mask"></div>
    </section>
</template>

<script>
    import { createNamespacedHelpers } from 'vuex'
    import { getImgUrl } from '@/utils/ImageLazyLoading.js'
    const discoverStore = createNamespacedHelpers('discoverStore')
    export default {
        name: 'qualitySongList',
        data() {
            return {
                img: '',
            }
        },
        methods: {
            toJump() {
                this.$router.push('/discover/songsheet/boutique')
            },
            getImgUrl(url, w, h) {
                if (!h) {
                    h = w
                }
                url += `?param=${w}y${h}`
                return url
            },
        },
        computed: {
            ...discoverStore.mapState(['fineMusic']),
        },
    }
</script>

<style lang="less" scoped>
    @import '../../../assets/style/mixins.less';
    .top-bar {
        position: relative;
        overflow: hidden;
        border-radius: 4px;
        cursor: pointer;
        .img {
            z-index: 1;
            display: flex;
            padding: 16px;
            position: relative;
            img {
                border-radius: 5px;
            }
            .icon {
                display: flex;
                margin-left: 15px;
                flex-direction: column;
                justify-content: space-around;
                .top {
                    width: 90px;
                    display: flex;
                    font-weight: 700;
                    padding: 3px 10px;
                    align-items: center;
                    border-radius: 50px;
                    justify-content: center;
                    color: rgb(238, 160, 14);
                    border: 1px solid rgb(238, 160, 14);
                    span {
                        font-size: 14px;
                        margin-left: 5px;
                        font-weight: 500;
                        display: inline-block;
                    }
                }
                .bottom {
                    p {
                        color: #fff;
                        font-size: 18px;
                    }
                    span {
                        color: rgba(209, 202, 202, 0.6);
                        font-size: 12px;
                    }
                }
            }
        }
        .background {
            .abs-stretch();
            filter: blur(16px);
            z-index: 0;
        }

        .background-mask {
            .abs-stretch();
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 0;
        }
    }
</style>
