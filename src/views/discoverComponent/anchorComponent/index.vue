<!-- 
    主播电台
-->
<template>
    <section class="anchor">
        <section v-if="this.show">
            <header>
                <!-- 轮播图 -->
                <Banner :bannerList="banner"></Banner>
            </header>
            <div class="categories">
                <div class="left" @click="rollFun('left')">
                    <i class="iconfont icon-arrow-left-bold"></i>
                </div>
                <ul ref="roll">
                    <li v-for="(item, index) in categories" :key="index">
                        <div @click="likeType(item)">
                            <img :src="item.pic56x56Url" alt="" />
                            <span>{{ item.name }}</span>
                        </div>
                    </li>
                </ul>
                <div class="right" @click="rollFun('right')">
                    <i class="iconfont icon-arrow-right-bold"></i>
                </div>
            </div>
            <!-- 付费精品 -->
            <div class="boutique">
                <router-link to="/" class="header-id">付费精品</router-link>
                <ul>
                    <li v-for="(item, index) in payBoutiqueList.list" :key="index">
                        <div class="left">
                            <img :src="item.picUrl" alt="" />
                        </div>
                        <div class="right">
                            <p class="name">{{ item.name }}</p>
                            <div>
                                <p class="rcmdtext">{{ item.rcmdText }}</p>
                                <p class="rcmdtext">{{ item.lastProgramName }}</p>
                            </div>
                            <p class="red">￥{{ PriceConversion(item.originalPrice) }}</p>
                        </div>
                    </li>
                </ul>
            </div>
            <section class="content-list">
                <template>
                    <contentList :contentList="recommend">
                        <h5 class="header-id">电台个性推荐</h5>
                    </contentList>
                </template>
                <template>
                    <contentList :contentList="djRadios">
                        <h5 class="header-id">电台个性推荐</h5>
                    </contentList>
                </template>
            </section>
        </section>
        <section v-else>
            <router-view></router-view>
        </section>
    </section>
</template>

<script>
    import Bus from '@/utils/bus.js'
    import storage from 'good-storage'
    import { debounce } from 'lodash-es'
    import contentList from './contentList'
    import { rounding, domBollFun } from '@/utils/index.js'
    import { getRecommendBanner } from '@/api/banner'
    import { getDjCate, getDjRadio, getDjCatelist, getDjToplist, getDjPersonalize } from '@/api/dj.js'
    export default {
        name: 'anchorComponent',
        data() {
            return {
                show: true,
                color: '',
                banner: [],
                djRadios: [],
                recommend: [],
                categories: [],
                payBoutiqueList: {}, //付费精品
            }
        },
        components: {
            contentList,
        },
        created() {
            getDjPersonalize(6).then(res => {
                this.recommend = res.data.data
            })
            getDjRadio(2).then(res => {
                this.djRadios = res.data.djRadios
            })
            getDjToplist(4).then(res => {
                this.payBoutiqueList = res.data.data
            })
            getDjCatelist().then(res => {
                this.categories = res.data.categories
            })
            getRecommendBanner().then(res => {
                this.banner = res.data.data
            })
        },
        methods: {
            calc() {
                this.screenWidth = document.body.clientWidth
            },
            // 横向滚动
            rollFun(direction) {
                let domObj = this.$refs.roll
                domBollFun(direction, domObj)
            },
            likeType(item) {
                console.log(item)
                this.$router.push({
                    path: `/liketype/${item.id}`,
                    query: {
                        name: item.name,
                    },
                })
            },
            PriceConversion(money) {
                return rounding(money)
            },
            handleScroll(e) {
                // let direction = e.deltaY > 0 ? 'right' : 'left'
                // let domObj = this.$refs.roll
                // this.rollFun(direction, domObj)
            },
        },
        mounted() {
            window.addEventListener('resize', debounce(this.calc, 1000))
            // window.addEventListener('mousewheel', this.handleScroll())
            document.getElementsByClassName('left')[1].style.opacity = 0
        },
    }
</script>

<style lang="less" scoped>
    @import '../../../assets/style/mixins.less';
    .anchor {
        width: 100%;
        overflow: hidden;
        .header-id {
            display: inline-block;
            font-size: 24px;
            font-weight: 700;
            margin: 15px 0;
        }
        .categories {
            position: relative;
            margin: 10px 0px 20px 0;
            .left {
                z-index: 999;
                .position3(0px,25%);
                i {
                    color: #b4aeae;
                    font-size: 30px;
                }
            }
            .right {
                .position1(0px,25%);
                z-index: 999;
                i {
                    color: #b4aeae;
                    font-size: 30px;
                }
            }
            display: flex;
            flex-direction: column;
            align-items: center;
            ul {
                width: 96%;
                box-sizing: border-box;
                white-space: nowrap;
                li {
                    display: inline-block;
                    width: calc(~'100% / 8');
                    white-space: nowrap;
                    div {
                        display: flex;
                        align-items: center;
                        flex-direction: column;
                        img {
                            width: 45%;
                            padding: 10px;
                            margin-bottom: 10px;
                            border-radius: 50%;
                            background: rgba(236, 180, 190, 0.3);
                        }
                        span {
                            color: #504d4d;
                            font-size: 18px;
                        }
                        &:hover {
                            img {
                                background: rgba(231, 140, 156, 0.3);
                            }
                        }
                    }
                }
            }
        }
        .boutique {
            ul {
                .flex();
                li {
                    display: flex;
                    margin-bottom: 20px;
                    width: calc(~'95% / 2');
                    div {
                        display: flex;
                        flex-direction: column;
                        justify-content: space-around;
                        width: 100%;
                        white-space: nowrap;
                    }
                    .left {
                        width: 40%;
                        img {
                            width: 100%;
                            border-radius: 5px;
                        }
                    }
                    .right {
                        width: 55%;
                        padding: 15px 0;
                        margin-left: 10px;
                        .name {
                            font-size: 22px;
                            font-weight: 700;
                        }
                        .rcmdtext {
                            font-size: 16px;
                            margin-bottom: 5px;
                            color: #928e8e;
                            .line();
                        }
                        .red {
                            color: rgb(226, 17, 17);
                        }
                    }
                }
            }
        }
    }
</style>
