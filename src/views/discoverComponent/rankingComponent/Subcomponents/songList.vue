<!-- 
    歌曲列表
-->

<template>
    <section class="song-list">
        <table>
            <tr>
                <th>音乐标题</th>
                <th>歌手</th>
                <th>专辑</th>
                <th>时长</th>
            </tr>
            <tr v-for="(item, index) in list" :key="index">
                <td>
                    <p class="identical">{{ index > 8 ? index + 1 : '0' + (index + 1) }}</p>
                    <p class="identical">
                        <heart :item="item"></heart>
                    </p>
                    <p class="identical"><i class="iconfont icon-xiazai"></i></p>
                    <p>
                        {{ item.name }}
                        <span v-if="item.alia.length > 0" class="identical">({{ item.alia[0] }})</span>
                        <span v-if="item.mv" class="red" @click="mvPage(item)">MV</span>
                    </p>
                </td>
                <td>
                    <div v-for="(ar, key) in item.ar" :key="key">
                        <span v-if="item.ar.length == 1" class="identical">{{ ar.name }}</span>
                        <span v-else class="identical">{{ item.ar.length == key + 1 ? ar.name : ar.name + '/' }}</span>
                    </div>
                </td>
                <td>
                    <div class="identical">{{ item.al.name }}</div>
                </td>
                <td>
                    <p class="identical">{{ minuteFn(item.dt) }}</p>
                </td>
            </tr>
        </table>
    </section>
</template>

<script>
    import heart from './heart'
    import { minute, likeMusic } from '@/utils/'
    import Bus from '@/utils/bus.js'
    import { createNamespacedHelpers } from 'vuex'
    const loginStore = createNamespacedHelpers('loginStore')
    export default {
        name: 'songList',
        props: {
            list: {
                type: Array,
            },
        },
        components: {
            heart,
        },
        data() {
            return {
                likeMusicid: '',
            }
        },
        created() {
            Bus.$on('loginYes', () => {
                location.reload(false)
            })
        },
        methods: {
            mvPage(item) {
                this.$router.push({
                    path: `/discover/mv/${item.mv}`,
                    query: {
                        user: item,
                    },
                })
            },
            minuteFn(time) {
                return minute(time)
            },
        },
        computed: {
            ...loginStore.mapState(['id']),
        },
    }
</script>

<style lang="less" scoped>
    @import '../../../../assets/style/mixins.less';
    .song-list {
        width: 100%;
        table {
            width: 100%;
            display: flex;
            flex-direction: column;
            tr {
                width: 100%;
                display: flex;
                th {
                    color: #777272;
                    font-weight: 500;
                    font-size: 18px;
                }
                th:nth-of-type(1) {
                    width: 40%;
                }
                th:nth-of-type(2),
                th:nth-of-type(3) {
                    display: flex;
                    justify-content: flex-start;
                    width: 25%;
                }
                th:nth-of-type(4) {
                    display: flex;
                    justify-content: flex-start;
                    width: 10%;
                }
                td {
                    display: flex;
                    align-items: center;
                    font-size: 16px;
                    padding: 5px 0;
                    white-space: nowrap;
                    .line();
                    .identical {
                        color: #7c7979;
                    }
                    &:nth-of-type(1) {
                        width: 40%;
                        box-sizing: border-box;
                        p {
                            margin: 0;
                            padding: 0;
                        }
                        .like {
                            color: rgb(226, 15, 15);
                        }
                        .red {
                            font-size: 12px;
                            display: inline-block;
                            margin-left: 10px;
                            border-radius: 5px;
                            text-align: center;
                            color: rgb(221, 17, 17);
                            border: 1px solid rgb(221, 17, 17);
                            &:hover {
                                .cursor();
                                border: 1px solid rgb(214, 33, 33);
                                color: rgb(214, 33, 33);
                            }
                        }
                        p {
                            margin-right: 15px;
                            &:nth-of-type(1) {
                                width: 10%;
                                text-align: center;
                            }
                            &:nth-of-type(2) {
                                width: 8%;
                                text-align: center;
                            }
                            &:nth-of-type(3) {
                                width: 8%;
                                text-align: center;
                            }
                            &:nth-of-type(4) {
                                width: 70%;
                                .line();
                            }
                        }
                    }
                    &:nth-of-type(2),
                    &:nth-of-type(3) {
                        width: 25%;
                        div {
                            .line();
                        }
                    }
                }

                &:nth-of-type(even) {
                    background-color: rgba(228, 215, 215, 0.3);
                }
                &:nth-of-type(1) {
                    margin-bottom: 15px;
                    &:hover {
                        background: #fff;
                    }
                }
                &:hover {
                    background: rgba(172, 163, 163, 0.3);
                }
            }
        }
    }
</style>
