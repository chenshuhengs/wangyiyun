<!-- 
    歌手MV
-->
<template>
    <section class="mv">
        <ul>
            <li v-for="(mv, index) in mvs" :key="index">
                <div class="mvimg">
                    <img :src="mv.imgurl16v9" alt="" @click="mvPage(mv)" />
                    <span class="count">{{ count(mv.playCount) }}</span>
                    <span class="time">{{ timeFn(mv.duration) }}</span>
                </div>
                <div>
                    <span class="name" @click="mvPage(mv)">{{ mv.name }}</span>
                </div>
            </li>
        </ul>
    </section>
</template>

<script>
    import { playCount, minute } from '@/utils/'
    import { getAlbumMv } from '@/api/singer'
    export default {
        name: 'mvCom',
        props: {
            singerId: {
                type: String,
            },
        },
        data() {
            return {
                mvs: [],
            }
        },
        created() {
            getAlbumMv({ id: this.singerId, limit: 90 }).then(res => {
                this.mvs = res.data.mvs
            })
        },
        methods: {
            count(item) {
                return playCount(item)
            },
            timeFn(time) {
                return minute(time)
            },
            mvPage(item) {
                this.$router.push({
                    path: `/discover/mv/${item.id}`,
                })
            },
        },
    }
</script>

<style lang="less" scoped>
    .mv {
        ul {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            li {
                width: calc(~'95% / 3');
                margin-bottom: 25px;
                div {
                    display: flex;
                    flex-direction: column;
                    img {
                        width: 100%;
                        border-radius: 5px;
                        cursor: pointer;
                    }
                    .name {
                        color: rgb(122, 118, 118);
                        white-space: nowrap;
                        overflow: hidden; /*超出部分隐藏*/
                        text-overflow: ellipsis; /*用...代替超出部分*/
                        line-height: 30px;
                        &:hover {
                            color: #000;
                            cursor: pointer;
                        }
                    }
                }
                .mvimg {
                    position: relative;
                    .count {
                        position: absolute;
                        right: 4px;
                        top: 4px;
                        color: #fff;
                    }
                    .time {
                        position: absolute;
                        right: 4px;
                        bottom: 4px;
                        color: #fff;
                    }
                }
            }
        }
    }
</style>
