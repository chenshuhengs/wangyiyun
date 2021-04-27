<!-- 
    歌手专辑
-->
<template>
    <section class="album">
        <ul>
            <li v-for="(itme, index) in hotAlbums" :key="index" class="album">
                <div class="portrait">
                    <img v-if="itme.album" :src="itme.album.picUrl" alt="" />
                    <p></p>
                </div>
                <div class="list">
                    <p v-if="itme.album" class="title">{{ itme.album.name }}</p>
                    <ul>
                        <li class="music" v-for="(song, key) in itme.songs" :key="key">
                            <div>
                                <span>{{ key + 1 }}</span>
                                <span>{{ song.name }}</span>
                                <span v-if="song.mv" class="mv" @click="mvPage(song.mv)">MV</span>
                            </div>
                            <div>{{ timeFn(song.dt) }}</div>
                        </li>
                    </ul>
                </div>
            </li>
        </ul>
    </section>
</template>

<script>
    import { minute } from '@/utils/'
    import { getAlbum, getArtistDetail, getArtistSlbum } from '@/api/singer'
    export default {
        name: 'Album',
        props: {
            singerId: {
                type: String,
            },
            hotAlbums: {
                type: Array,
                default: () => [],
            },
        },
        methods: {
            timeFn(time) {
                return minute(time)
            },
            mvPage(id) {
                this.$router.push({
                    path: `/discover/mv/${id}`,
                })
            },
        },
    }
</script>

<style lang="less" scoped>
    .album {
        ul {
            width: 100%;
            .album {
                margin-bottom: 100px;
                display: flex;
                justify-content: space-between;
                .portrait {
                    width: 17%;
                    img {
                        width: 100%;
                        border-radius: 5px;
                    }
                }
                .list {
                    width: 75%;
                    display: flex;
                    align-items: flex-start;
                    justify-content: flex-start;
                    flex-direction: column;
                    .title {
                        font-weight: 700;
                        font-size: 20px;
                    }
                    .music {
                        width: 100%;
                        display: flex;
                        justify-content: space-between;
                        padding: 10px 10px;
                        &:nth-of-type(odd) {
                            background-color: rgba(216, 208, 208, 0.3);
                        }
                        &:hover {
                            background-color: rgba(138, 133, 133, 0.3);
                        }
                        span {
                            margin-right: 20px;
                        }
                        .mv {
                            font-size: 14px;
                            padding: 0 5px;
                            border-radius: 3px;
                            border: 1px solid rgb(214, 21, 21);
                            color: rgb(214, 21, 21);
                        }
                    }
                }
            }
        }
    }
</style>
