<!-- 
    个性推荐
-->
<template>
    <section>
        <Banner :bannerList="bannerList"></Banner>
        <section class="content">
            <!-- 推荐歌单 -->
            <div class="recommend">
                <h5>推荐歌单 🌟</h5>
                <ul>
                    <li v-for="(music, index) in recommendMusic" :key="index">
                        <div>
                            <img :src="music.picUrl" alt="" />
                            <i class="iconfont icon-play"></i>
                        </div>
                        <span>{{ music.name }}</span>
                    </li>
                </ul>
            </div>
            <!-- 独家放送 MV -->
            <mvComponent>
                <template #title>
                    <h5>独家放送 🌟</h5>
                </template>
            </mvComponent>
        </section>
    </section>
</template>

<script>
    import { getBanner } from '@/api/banner.js'
    import mvComponent from './mvComponent'
    import { getRecommendMusic } from '@/api/recommend.js'
    export default {
        name: 'personalityComponent',
        data() {
            return {
                bannerList: [],
                recommendMusic: [], //推荐歌单
            }
        },
        components: {
            mvComponent,
        },
        created() {
            getBanner().then(res => {
                if (res.status === 200) {
                    this.bannerList = res.data.banners
                }
            })
            getRecommendMusic().then(res => {
                this.recommendMusic = res.data.result
                console.log(this.recommendMusic)
            })
        },
    }
</script>

<style lang="less" scoped>
    @import '../../../assets/style/mixins.less';
    .content {
        h5 {
            padding: 10px 0;
            margin: 0;
        }
        .recommend {
            ul {
                width: 100%;
                display: flex;
                justify-content: space-between;
                flex-wrap: wrap;
                li {
                    width: calc(~'90% / 5');
                    margin-bottom: 15px;
                    div {
                        display: flex;
                        position: relative;
                        img {
                            .imgsize();
                        }
                        i {
                            .position2(5px,5px);
                            display: inline-block;
                            padding: 8px;
                            background: #fff;
                            border-radius: 50%;
                            color: rgb(226, 10, 10);
                            font-size: 24px;
                            opacity: 0;
                        }
                        &:hover {
                            i {
                                .opacity();
                            }
                        }
                        .fadeIn();
                    }
                    span {
                        .twoline();
                    }
                }
            }
        }
    }
</style>
