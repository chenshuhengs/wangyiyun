<!-- 
    独家放送
-->
<template>
    <section>
        <h5>独家放送</h5>
        <div class="content">
            <ul>
                <li v-for="(item, index) in result" :key="index" @click="mvRouteLink(item)">
                    <div>
                        <img :src="item.picUrl" alt="" />
                        <i class="iconfont icon-bofang222"></i>
                    </div>
                    <p>{{ item.name }}</p>
                </li>
            </ul>
        </div>
    </section>
</template>

<script>
    import { getSoleList } from '@/api/recommend.js'
    export default {
        name: 'exclusiveBroadcast',
        data() {
            return {
                limit: 30,
                result: [],
            }
        },
        created() {
            getSoleList({ limit: this.limit }).then(res => {
                this.result = res.data.result
                console.log(this.result)
            })
        },
        methods: {
            mvRouteLink(item) {
                this.$router.push({
                    path: `/discover/mv/${item.id}`,
                })
            },
        },
    }
</script>

<style lang="less" scoped>
    section {
        padding: 30px;
        h5 {
            font-size: 20px;
            font-weight: 700;
        }
        .content {
            ul {
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                li {
                    width: calc(~'98% / 2');
                    img {
                        width: 100%;
                        border-radius: 5px;
                    }
                    p {
                        white-space: nowrap;
                        overflow: hidden; /*超出部分隐藏*/
                        text-overflow: ellipsis; /*用...代替超出部分*/
                        line-height: 40px;
                        color: #666363;
                    }
                    &:hover {
                        cursor: pointer;
                        p {
                            color: #000;
                        }
                    }
                    div {
                        position: relative;
                        i {
                            position: absolute;
                            left: 5px;
                            top: 5px;
                            color: #fff;
                            padding: 5px 9px;
                            background: rgba(73, 72, 72, 0.3);
                            border-radius: 50%;
                            border: 1px solid #e0e0e0;
                        }
                    }
                }
            }
        }
    }
</style>
