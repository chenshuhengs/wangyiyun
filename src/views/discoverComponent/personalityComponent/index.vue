<!-- 
    个性推荐
-->
<template>
    <section id="index" ref="beatHome">
        <Banner :bannerList="bannerList"></Banner>
        <section class="content">
            <!-- 推荐歌单 -->
            <div class="recommend">
                <router-link to="/discover/songsheet">推荐歌单 🌟</router-link>
                <ul>
                    <li v-for="(music, index) in recommendMusic" :key="index" @click="recommendMusicFn(music)">
                        <div>
                            <img :src="music.picUrl" alt="" />
                            <i class="iconfont icon-play"></i>
                            <span class="iconfont icon-insert-right">{{ playCountFun(music.playCount) }}</span>
                        </div>
                        <span>{{ music.name }}</span>
                    </li>
                </ul>
            </div>
            <!-- 独家放送 MV -->
            <mvComponent>
                <template #content>
                    <router-link to="/discover/exclusivebroadcast">{{ sole.name }} 🌟</router-link>
                    <ul class="sole">
                        <li v-for="(item, index) in sole.result" :key="index" @click="mvRouteLink(item)">
                            <div>
                                <img :src="item.picUrl" alt="" />
                                <i class="iconfont icon-play"></i>
                            </div>
                            <p>{{ item.name }}</p>
                        </li>
                    </ul>
                </template>
            </mvComponent>
            <!-- 最新音乐 -->
            <mvComponent>
                <template #content>
                    <router-link to="/discover/songsheet">最新音乐🌟</router-link>
                    <ul class="newest-music">
                        <li class="music" v-for="(music, index) in newestMusic" :key="index" @click="playMusic(music)">
                            <div class="left">
                                <img :src="music.picUrl" alt="" />
                                <i class="iconfont icon-play"></i>
                            </div>
                            <div class="right">
                                <div class="name">
                                    <span>{{ music.name }}</span>
                                    <span class="alias" v-if="music.song.alias[0]">({{ music.song.alias[0] }})</span>
                                </div>
                                <ul>
                                    <li class="artist" v-for="(artist, key) in music.song.artists" :key="key">
                                        <span v-if="(key + 1) % 2 == 0">/</span>
                                        <span>{{ artist.name }}</span>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </template>
            </mvComponent>
            <!-- 推荐MV -->
            <mvComponent>
                <template #content>
                    <router-link to="/discover/songsheet">推荐MV🌟</router-link>
                    <ul class="mv">
                        <li
                            v-for="(item, index) in MV"
                            :key="index"
                            ref="li"
                            :class="[screenWidth > 1250 ? 'fourimgblock' : 'fourimg']"
                            @click="mvRouteLink(item)"
                        >
                            <img :src="item.picUrl" alt="" />
                            <p class="copywriter">{{ item.copywriter }}</p>
                            <p class="name">{{ item.name }}</p>
                            <p class="artist">{{ item.artistName }}</p>
                        </li>
                    </ul>
                </template>
            </mvComponent>
            <!-- 底部 -->
            <Tips></Tips>
        </section>
    </section>
</template>

<script>
    import Bus from '@/utils/bus.js'
    import Tips from '@/components/Tips'
    import { playCount } from '@/utils/'
    import { throttle } from 'lodash-es'
    import mvComponent from './mvComponent'
    import { getBanner } from '@/api/banner.js'
    import { getMv, getDj, getSole, getNewMusice, getRecommendMusic } from '@/api/recommend.js'
    export default {
        name: 'personalityComponent',
        data() {
            return {
                MV: [],
                sole: {}, //独家放送
                scrollTop: '',
                bannerList: [],
                screenWidth: '', //页面宽
                storageScreenWidth: '', //存储上一次的页面宽
                newestMusic: [], //最新音乐
                recommendMusic: [], //推荐歌单
            }
        },
        components: {
            Tips,
            mvComponent,
        },
        created() {
            getMv().then(res => {
                this.MV = res.data.result
            })
            getSole().then(res => {
                this.sole = res.data
            })
            getBanner().then(res => {
                this.bannerList = res.data.banners
            })
            getNewMusice(12).then(res => {
                this.newestMusic = res.data.result
            })
            getRecommendMusic().then(res => {
                this.recommendMusic = res.data.result
            })
            this.screenWidth = document.body.clientWidth
        },
        methods: {
            calc() {
                this.screenWidth = document.body.clientWidth
            },
            playMusic(item) {
                Bus.$emit('play', item.id)
            },
            playCountFun(count) {
                return playCount(count)
            },
            mvRouteLink(item) {
                this.$router.push({
                    path: `/discover/mv/${item.id}`,
                })
            },
            recommendMusicFn(item) {
                this.$router.push({
                    path: `/discover/ranking/${item.id}`,
                })
            },
        },
        mounted() {
            window.addEventListener('resize', throttle(this.calc, 1000))
        },
    }
</script>

<style lang="less" scoped>
    @import '../../../assets/style/mixins.less';
    section {
        .content {
            a {
                margin: 0;
                display: block;
                padding: 20px 0 10px 0;
                color: var(--font-color);
                font-size: 20px;
                font-weight: 600;
                &:hover {
                    .cursor();
                }
            }
            span,
            p {
                color: var(--font-color);
            }
            .recommend {
                ul {
                    width: 100%;
                    .flex();
                    li {
                        width: calc(~'90% / 5');
                        margin-bottom: 15px;
                        div {
                            display: flex;
                            position: relative;
                            img {
                                .imgsize();
                            }
                            span {
                                .position1(7px,-3px);
                                color: #fff;
                                font-size: 12px;
                            }
                            i {
                                .position2(7px,11px);
                                display: inline-block;
                                padding: 6px 10px;
                                background: #fff;
                                border-radius: 50%;
                                color: rgb(226, 10, 10);
                                font-size: 24px;
                                opacity: 0;
                            }
                            &:hover {
                                cursor: pointer;
                                i {
                                    .opacity();
                                }
                            }
                            .fadeIn();
                        }
                        span {
                            .twoline(14px,20px);
                        }
                    }
                }
            }
            .sole {
                width: 100%;
                .flex();
                li {
                    width: calc(~'95% / 3');
                    &:hover {
                        cursor: pointer;
                    }
                    div {
                        display: flex;
                        position: relative;
                        img {
                            .imgsize(5px);
                        }
                        i {
                            .position3(5px,5px);
                            padding: 5px;
                            color: #fff;
                            font-size: 16px;
                            border-radius: 50%;
                            background: rgba(53, 50, 50, 0.3);
                        }
                    }
                    p {
                        font-size: 12px;
                    }
                }
            }
            .newest-music {
                .flex();
                .music {
                    display: flex;
                    width: calc(~'95% / 3');
                    margin-bottom: 10px;
                    .left {
                        position: relative;
                        width: 20%;
                        display: flex;
                        img {
                            width: 100%;
                            border-radius: 5px;
                        }
                        i {
                            color: rgb(216, 29, 29);
                            font-size: 18px;
                            padding: 3px;
                            .position1(30%,30%);
                            border-radius: 50%;
                            background: rgba(255, 255, 255, 0.6);
                        }
                    }
                    .right {
                        width: 80%;
                        padding: 10px 10px 0 10px;
                        box-sizing: border-box;
                        .name {
                            font-size: 10px;
                            .line();
                            .alias {
                                color: #8b8989;
                            }
                        }
                        ul {
                            display: flex;
                            margin-top: 10px;
                            .artist {
                                font-size: 10px;
                                white-space: nowrap;
                            }
                        }
                    }
                    &:hover {
                        .right {
                            background: rgba(209, 206, 206, 0.3);
                            border-top-right-radius: 5px;
                            border-bottom-right-radius: 5px;
                        }
                    }
                }
            }
            .mv {
                .flex();
                img {
                    width: 100%;
                    border-radius: 5px;
                }
                li {
                    position: relative;
                    overflow: hidden;
                    .name {
                        .line();
                        font-size: 12px;
                    }
                    .artist {
                        font-size: 10px;
                        color: #7a7878;
                    }
                    .copywriter {
                        width: 100%;
                        color: #fff;
                        font-size: 12px;
                        padding: 8px 5px;
                        .position3(0px,-17px);
                        background-color: rgba(0, 0, 0, 0.4);
                        transform: translateY(-17px);
                        /* 移回也需要0.4s时间过渡 */
                        transition: transform 1s;
                    }
                    &:hover {
                        cursor: pointer;
                        .copywriter {
                            transform: translateY(17px);
                            /* 0.4s完成transform移动效果*/
                            transition: transform 0.4s;
                            transition-delay: 0.3s;
                            opacity: 1;
                        }
                    }
                }
                .fourimg {
                    animation: 0.5s fadeIn1 forwards;
                    @keyframes fadeIn1 {
                        0% {
                            width: 24%;
                        }
                        100% {
                            width: 32%;
                        }
                    }
                    &:nth-of-type(4) {
                        display: none;
                    }
                }
                .fourimgblock {
                    overflow: hidden;
                    // width: 24%;
                    animation: 0.4s fadeIn2 forwards;
                    @keyframes fadeIn2 {
                        0% {
                            width: 32%;
                        }
                        100% {
                            width: 24%;
                        }
                    }
                }
            }
        }
    }
</style>
