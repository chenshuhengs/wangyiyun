<template>
    <section class="content-list">
        <section>
            <ul>
                <li v-for="(item, index) in list" :key="index" class="line">
                    <div class="content">
                        <div class="left">
                            <img :src="item.coverImgUrl" alt="" />
                        </div>
                        <ul class="right">
                            <li v-for="(track, key) in item.tracks" :key="key">
                                <div>
                                    <span class="num">{{ key + 1 }}</span>
                                    <span>{{ track.first }}</span>
                                </div>
                                <div class="name">
                                    <span class="second">{{ track.second }}</span>
                                </div>
                            </li>
                            <div class="look" @click="musicListType(item)">查看全部 ></div>
                        </ul>
                    </div>
                </li>
                <li class="line">
                    <div class="content">
                        <div class="left">
                            <img :src="artistToplist.coverUrl" alt="" />
                        </div>
                        <ul class="right">
                            <li v-for="(artist, index) in artistToplist.artists" :key="index">
                                <div>
                                    <span class="num">{{ index + 1 }}</span>
                                    <span>{{ artist.first }}</span>
                                </div>
                                <div class="name">
                                    <span class="second">{{ artist.second }}</span>
                                </div>
                            </li>
                            <div class="look" @click="musicListType(artistToplist)">查看全部 ></div>
                        </ul>
                    </div>
                </li>
            </ul>
        </section>
    </section>
</template>

<script>
    export default {
        name: 'contentList',
        props: {
            list: {
                type: Array,
                default: () => [],
            },
            artistToplist: {
                type: Object,
                default: () => {},
            },
        },
        methods: {
            musicListType(item) {
                this.$router.push({ path: `/discover/ranking/${item.id}` })
            },
        },
    }
</script>

<style lang="less" scoped>
    @import '../../../assets/style/mixins.less';
    .content-list {
        ul {
            .line {
                padding-bottom: 60px;
                .look {
                    color: #807d7d;
                    font-size: 20px;
                    &:hover {
                        .cursor();
                        color: #000;
                    }
                }
                .content {
                    .flex();
                    .left {
                        width: 25%;
                        display: flex;
                        flex-direction: column;
                        img {
                            width: 100%;
                            border-radius: 10px;
                        }
                    }
                    .right {
                        width: 70%;
                        position: relative;
                        li {
                            display: flex;
                            justify-content: space-between;
                            // .flex();
                            color: #807d7d;
                            padding: 0 10px;
                            font-size: 18px;
                            align-items: center;
                            height: calc(~'100% / 5');
                            .num {
                                margin-right: 10px;
                            }
                            .name {
                                // width: 35%;
                                display: flex;
                                justify-content: flex-end;

                                .second {
                                    // .line();
                                }
                            }
                            &:nth-of-type(odd) {
                                background-color: rgba(219, 213, 213, 0.3);
                            }
                        }
                        .look {
                            font-size: 14px;
                            .position4(0px,-18px);
                        }
                    }
                }
            }
        }
    }
</style>
