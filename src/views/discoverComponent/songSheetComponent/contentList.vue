<!-- 
    内容区
-->
<template>
    <section class="contentlist">
        <ul>
            <li v-for="(item, index) in musicList" :key="index">
                <div class="author">
                    <img :src="item.coverImgUrl" alt="" />
                    <div class="top">
                        <i class="iconfont icon-insert-right"></i>
                        <span class="count">{{ playCountFun(item.playCount) }}</span>
                    </div>
                    <div class="bottom">
                        <i class="iconfont icon-wode"></i>
                        <span class="name">{{ item.creator.nickname }}</span>
                    </div>
                    <div class="play">
                        <i class="iconfont icon-play"></i>
                    </div>
                </div>
                <div class="details">
                    <span>{{ item.name }}</span>
                </div>
            </li>
        </ul>
    </section>
</template>

<script>
    import { playCount } from '@/utils/'
    export default {
        name: 'contentList',
        props: {
            musicList: {
                type: Array,
                default: () => [],
            },
        },
        methods: {
            playCountFun(count) {
                return playCount(count)
            },
        },
    }
    // 11:anchor  0
</script>

<style lang="less" scoped>
    @import '../../../assets/style/mixins.less';
    .contentlist {
        width: 100%;
        ul {
            .flex();
            li {
                width: calc(~'88% / 4');
                margin-bottom: 15px;
                .author {
                    display: flex;
                    position: relative;
                    margin-bottom: 10px;
                    &:hover {
                        .play {
                            .opacity();
                        }
                    }
                    .fadeIn();
                    img {
                        width: 100%;
                        border-radius: 10px;
                    }
                    .top {
                        color: #fff;
                        white-space: nowrap;
                        .position1(6px,-5px);
                        .count {
                            font-size: 14px;
                        }
                        i {
                            font-size: 18px;
                        }
                    }
                    .bottom {
                        color: #fff;
                        white-space: nowrap;
                        .position4(10px,10px);
                        .name {
                            font-size: 14px;
                        }
                        i {
                            font-size: 20px;
                        }
                    }
                    .play {
                        .position2(8px,10px);
                        opacity: 0;
                        i {
                            padding: 8px;
                            font-size: 20px;
                            background: #fff;
                            border-radius: 50%;
                            color: rgb(207, 20, 20);
                        }
                    }
                }
                .details {
                    display: flex;
                    font-size: 16px;
                    span {
                        color: rgb(117, 112, 112);
                        line-height: 30px;
                        &:hover {
                            .cursor();
                            color: rgb(36, 33, 33);
                        }
                    }
                }
            }
        }
    }
</style>
