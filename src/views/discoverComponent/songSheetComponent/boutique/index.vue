<!-- 
    精品歌单列表
-->
<template>
    <section class="boutique">
        <header>
            <div>
                <p>精品歌单</p>
                <p @click="prpup">
                    <Icon name="arrow-up-bold" :size="9" :class="[direction ? 'rotate' : 'return']"></Icon>
                    <span v-if="tagnameId == '全部'">全部歌单</span>
                    <span v-else>{{ tagnameId }}</span>
                </p>
            </div>
            <transition name="fade">
                <Popup v-if="direction" :tagnameId="tagnameId" @playlistFn="playlistFn"></Popup>
            </transition>
        </header>
        <ul v-infinite-scroll="getBoutiqueList" infinite-scroll-immediate="true" infinite-scroll-distance="200" infinite-scroll-delay="300">
            <li v-for="(playlist, index) in playlists" :key="index" class="infinite-list-item">
                <div class="left" @click="recommendMusicFn(playlist)">
                    <img :src="playlist.coverImgUrl" alt="" />
                    <div class="horn"></div>
                    <em class="iconfont icon-huangguan"></em>
                    <i class="iconfont icon-play"></i>
                    <div class="playcount">
                        <span class="iconfont icon-insert-right"></span>
                        <span>{{ playCountMusic(playlist.playCount) }}</span>
                    </div>
                </div>
                <div class="right">
                    <p class="name">
                        <span>{{ playlist.name }}</span>
                    </p>
                    <p class="nickname" @click="userLink(playlist)">
                        <span>by</span>
                        {{ playlist.creator.nickname }}
                    </p>
                    <p class="copywriter">
                        <span class="tag">{{ playlist.tag }}</span>
                        <span>{{ playlist.copywriter }}</span>
                    </p>
                </div>
            </li>
        </ul>
    </section>
</template>

<script>
    import Popup from './Popup'
    import { playCount } from '@/utils/'
    import { createNamespacedHelpers } from 'vuex'
    const discoverStore = createNamespacedHelpers('discoverStore')
    export default {
        name: 'boutique',
        data() {
            return {
                count: 0,
                tagnameId: '',
                playlists: [],
                direction: false,
            }
        },
        components: {
            Popup,
        },
        created() {
            this.tagnameId = this.$store.state.discoverStore.activeLable
        },
        methods: {
            prpup() {
                this.direction = !this.direction
            },
            userLink(item) {
                this.$router.push({
                    path: `/discover/user/${item.userId}`,
                })
            },
            playlistFn(playlist, name) {
                this.tagnameId = name
                this.direction = false
                this.playlists = playlist
            },
            playCountMusic(count) {
                return playCount(count)
            },
            ...discoverStore.mapActions(['getBoutiqueSong']),
            getBoutiqueList() {
                if (this.count > this.total) {
                    this.count = 20
                    return
                }
                this.count += 10
                this.getBoutiqueSong({
                    limit: this.count,
                    cat: this.tagnameId,
                }).then(res => {
                    this.playlists = res.data.playlists
                })
            },
            recommendMusicFn(item) {
                this.$router.push({
                    path: `/discover/ranking/${item.id}`,
                })
            },
        },
        computed: {
            ...discoverStore.mapState(['total', 'activeLable']),
        },
    }
</script>

<style lang="less" scoped>
    @import '../../../../assets/style/mixins.less';
    .boutique {
        z-index: 0;
        header {
            position: relative;
            div {
                .flex();
                margin: 15px 0;
                p {
                    display: flex;
                    align-items: center;
                    &:nth-of-type(1) {
                        font-weight: 700;
                        font-size: 20px;
                    }
                    &:nth-of-type(2) {
                        font-size: 14px;
                        padding: 3px 10px;
                        border-radius: 50px;
                        border: 1px solid #e0e0e0;
                        span {
                            display: inline-block;
                            margin-left: 5px;
                        }
                        &:hover {
                            background-color: rgba(153, 147, 147, 0.2);
                        }
                    }
                    .rotate {
                        .rotate(rotate1);
                    }
                    .return {
                        .rotate(rotate2);
                    }
                    .rotate1();
                    .rotate2();
                }
            }
        }
        ul {
            .flex();
            li {
                display: flex;
                margin-bottom: 20px;
                width: calc(~'98% / 2');
                div {
                    display: flex;
                }
                .left {
                    width: 40%;
                    position: relative;
                    border-radius: 10px;
                    overflow: hidden;
                    margin-right: 10px;
                    img {
                        width: 100%;
                    }
                    .horn {
                        position: absolute;
                        width: 0;
                        height: 0;
                        border-top: 60px solid rgb(199, 147, 50);
                        border-right: 60px solid transparent;
                    }
                    em {
                        .position3(6px, 6px);
                        color: #fff;
                        font-size: 20px;
                        font-weight: 700;
                        transform: rotate(314deg);
                    }
                    .playcount {
                        .position1(6px);
                        color: #fff;
                        font-size: 14px;
                        display: flex;
                        align-items: center;
                        .iconfont {
                            font-size: 20px;
                        }
                    }
                    &:hover {
                        cursor: pointer;
                        i {
                            .opacity();
                        }
                    }
                    .fadeIn();
                    i {
                        .position2(8px,10px);
                        opacity: 0;
                        padding: 5px 8px;
                        font-size: 20px;
                        background: #fff;
                        border-radius: 50%;
                        color: rgb(207, 20, 20);
                    }
                }
                .right {
                    width: 60%;
                    display: flex;
                    padding: 20px 0;
                    flex-direction: column;
                    align-items: flex-start;
                    justify-content: space-around;
                    .name {
                        width: 100%;
                        .line();
                        span {
                            color: #5f5d5d;
                            font-size: 20px;
                            &:hover {
                                .cursor();
                                color: #000;
                            }
                        }
                    }
                    .nickname {
                        width: 100%;
                        font-size: 12px;
                        color: #979696;
                        &:hover {
                            .cursor();
                            color: #4b4949;
                        }
                    }
                    .copywriter {
                        width: 100%;
                        .line();
                        .tag {
                            border: 1px solid rgb(235, 20, 20);
                            padding: 0px 2px;
                            font-size: 14px;
                            border-radius: 3px;
                            color: rgb(235, 20, 20);
                        }
                        span:nth-of-type(2) {
                            font-size: 14px;
                            color: #888585;
                            margin-left: 10px;
                        }
                    }
                }
            }
        }
    }
</style>
