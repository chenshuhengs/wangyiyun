<!-- 
    歌手页
-->
<template>
    <section class="singer">
        <header>
            <div class="portrait">
                <img :src="artist.picUrl" alt="" />
            </div>
            <div class="user">
                <p>{{ artist.name }}</p>
                <p>
                    <span v-for="(item, index) in artist.alias" :key="index">{{ item }}</span>
                </p>
                <p>
                    <span>单曲数:{{ singerUser.musicSize }}</span>
                    <span>专辑数:{{ singerUser.albumSize }}</span>
                    <span>MV数:{{ singerUser.mvSize }}</span>
                </p>
            </div>
        </header>
        <div class="content">
            <ul>
                <li v-for="(item, index) in list" :key="index" :class="name == item ? 'active' : ''" @click="bottomLine(item)">{{ item }}</li>
            </ul>
            <transition name="fade">
                <Album v-if="name == '专辑'" :singerId="singerId" :hotAlbums="hotAlbums"></Album>
                <mvCom v-if="name == 'MV'" :singerId="singerId"></mvCom>
                <detailsCom v-if="name == '歌手详情'" :singerId="singerId"></detailsCom>
                <similarSinger v-if="name == '相似歌手'" :singerId="singerId"></similarSinger>
            </transition>
        </div>
    </section>
</template>

<script>
    import mvCom from './list/mvCom'
    import Album from './list/Album'
    import detailsCom from './list/details'
    import similarSinger from './list/similarSinger'
    import { getAlbum, getArtistDetail, getArtistSlbum } from '@/api/singer'
    export default {
        name: 'singerDetails',
        components: {
            mvCom,
            Album,
            detailsCom,
            similarSinger,
        },
        data() {
            return {
                name: '专辑',
                artist: '',
                mvSize: 0, //MV数量
                singerId: 0,
                hotAlbums: [],
                singerInit: {},
                singerUser: {},
                list: ['专辑', 'MV', '歌手详情', '相似歌手'],
            }
        },
        created() {
            this.singerId = this.$route.params.id
            getArtistDetail({ id: this.singerId }).then(res => {
                this.singerUser = res.data.data.artist
            })
            // 获取歌手专辑信息
            getArtistSlbum({ id: this.singerId, limit: 30 }).then(res => {
                this.artist = res.data.artist
                this.hotAlbums = res.data.hotAlbums
                this.hotAlbums.forEach(e => {
                    getAlbum({ id: e.id }).then(res => {
                        e.album = res.data.album
                        e.songs = res.data.songs
                    })
                })
            })
        },
        methods: {
            bottomLine(item) {
                this.name = item
            },
        },
    }
</script>

<style lang="less" scoped>
    .singer {
        padding: 30px;
        header {
            display: flex;
            .portrait {
                width: 270px;
                height: 270px;
                margin-right: 20px;
                img {
                    width: 100%;
                    height: 100%;
                    border-radius: 10px;
                }
            }
            .user {
                p {
                    font-size: 20px;
                    color: #575454;
                    span {
                        margin-right: 20px;
                    }
                }
            }
        }
        .content {
            margin-top: 70px;
            ul {
                display: flex;
                margin-bottom: 30px;
                li {
                    margin-right: 20px;
                }
                .active {
                    border-bottom: 3px solid rgb(231, 20, 20);
                }
            }
        }
    }
</style>
