<template>
    <section class="like-type">
        <div class="header">{{ name }}</div>
        <ul>
            <li v-for="(item, index) in contentList" :key="index">
                <div class="left">
                    <img :src="item.picUrl" alt="" />
                </div>
                <div class="right">
                    <p class="top">
                        <span>{{ item.name }}</span>
                    </p>
                    <div class="bottom">
                        <p>
                            <span>{{ item.rcmdtext }}</span>
                        </p>
                        <p class="bottom">
                            <span>节目:{{ item.programCount }}</span>
                            <span>订阅:{{ count(item.subCount) }}</span>
                        </p>
                    </div>
                </div>
            </li>
        </ul>
    </section>
</template>

<script>
    import { getDjCate } from '@/api/dj.js'
    import { playCount } from '@/utils'
    export default {
        name: 'likeTypeCom',
        data() {
            return {
                name: '',
                contentList: [],
            }
        },
        created() {
            getDjCate(this.$route.params.type).then(res => {
                this.name = this.$route.query.name
                this.contentList = res.data.djRadios
            })
        },
        methods: {
            count(count) {
                return playCount(count)
            },
        },
    }
</script>

<style lang="less" scoped>
    @import '../../assets/style/mixins.less';
    .like-type {
        box-sizing: border-box;
        .header {
            font-size: 24px;
            font-weight: 700;
            padding: 20px 0;
        }
        ul {
            .flex();
            li {
                width: calc(~'95% / 2');
                display: flex;
                margin-bottom: 20px;
                div {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    .top {
                        height: 50%;
                        font-size: 16px;
                        display: flex;
                        align-items: center;
                    }
                    .bottom {
                        font-size: 14px;
                        color: #817d7d;
                        &:nth-of-type(2) {
                            margin-top: 10px;
                        }
                        span:nth-of-type(2) {
                            display: inline-block;
                            padding-left: 10px;
                        }
                    }
                }
                .left {
                    width: 30%;
                    margin-right: 10px;
                    img {
                        width: 100%;
                        border-radius: 5px;
                        border: 1px solid #e0e0e0;
                    }
                }
                .right {
                    width: 70%;
                }
            }
        }
    }
</style>
