<template>
    <section class="singer-list">
        <div class="top">
            <ul>
                <li v-for="(item, index) in artists.slice(0, 3)" :key="index" @click="singerPage(item)">
                    <div class="left">
                        <div class="index">
                            <span class="num">{{ index + 1 }}</span>
                        </div>
                        <div class="init">
                            <p class="name">
                                {{ item.name }}
                            </p>
                            <p class="score">热度:{{ item.score }}</p>
                        </div>
                    </div>
                    <div class="right">
                        <img v-if="item.img1v1Url" :src="item.img1v1Url" alt="" />
                    </div>
                </li>
            </ul>
        </div>
        <div class="bottom">
            <ul>
                <li v-for="(item, index) in artists.slice(3, artists.length)" :key="index" @click="singerPage(item)">
                    <div class="left">
                        <span class="index">{{ index + 4 }}</span>
                        <img v-if="item.img1v1Url" :src="item.img1v1Url" alt="" />
                        <span>{{ item.name }}</span>
                    </div>
                    <div class="right">
                        <p>
                            <span class="score">热度:{{ item.score }}</span>
                        </p>
                    </div>
                </li>
            </ul>
        </div>
    </section>
</template>

<script>
    import { getToplistArtist } from '@/api/singer'
    export default {
        name: 'singerList',
        props: {
            type: {
                type: Number,
                default: 1,
            },
        },
        data() {
            return {
                artists: [],
            }
        },
        created() {
            getToplistArtist({ type: this.type }).then(res => {
                this.artists = res.data.list.artists
            })
        },
        methods: {
            singerPage(item) {
                this.$router.push({
                    path: `/discover/singerdetails/${item.id}`,
                })
            },
        },
        watch: {
            type(a) {
                getToplistArtist({ type: a }).then(res => {
                    this.artists = res.data.list.artists
                })
            },
        },
    }
</script>

<style lang="less" scoped>
    .singer-list {
        .top {
            padding: 20px 30px;
            ul {
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                li {
                    display: flex;
                    width: calc(~'95% / 3');
                    border-radius: 5px;
                    &:hover {
                        background: rgba(170, 163, 163, 0.3);
                        cursor: pointer;
                    }
                    .left {
                        width: 65%;
                        background: rgba(211, 207, 207, 0.3);
                        border-top-left-radius: 5px;
                        border-bottom-left-radius: 5px;
                        .index {
                            span {
                                display: inline-block;
                                width: 50px;
                                height: 50px;
                                padding-left: 5px;
                                font-size: 50px;
                                font-weight: 700;
                                line-height: 45px;
                                color: rgb(240, 135, 135);
                                background: rgba(255, 255, 255, 0.4);
                                -webkit-clip-path: polygon(0 0, 0 100%, 100% 0);
                                clip-path: polygon(0 0, 0 100%, 100% 0);
                            }
                        }
                        .init {
                            margin-left: 70px;
                            .name {
                                font-size: 20px;
                            }
                            .score {
                                color: #8b8a8a;
                            }
                        }
                    }
                    .right {
                        width: 35%;
                        img {
                            width: 100%;
                            border-top-right-radius: 5px;
                            border-bottom-right-radius: 5px;
                        }
                    }
                }
            }
        }
        .bottom {
            ul {
                li {
                    display: flex;
                    padding: 10px 0;
                    .left {
                        width: 50%;
                        .index {
                            width: 20%;
                            display: inline-block;
                            text-align: center;
                            font-size: 20px;
                            color: #706c6c;
                        }
                        img {
                            width: 13%;
                            border-radius: 5px;
                        }
                    }
                    &:nth-of-type(odd) {
                        background: rgba(211, 207, 207, 0.3);
                    }
                    &:hover {
                        cursor: pointer;
                        background: rgba(117, 116, 116, 0.3);
                    }
                    .right {
                        width: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: flex-end;
                        padding-right: 30px;
                        p {
                            width: 20%;
                            margin: 0;
                        }
                    }
                }
            }
        }
    }
</style>
