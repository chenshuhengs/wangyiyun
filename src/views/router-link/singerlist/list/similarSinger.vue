<!-- 
    相似歌手
-->
<template>
    <section class="similar-singer">
        <ul>
            <li v-for="(item, index) in artists" :key="index">
                <img :src="item.img1v1Url" alt="" @click="singerPage(item)" />
                <p @click="singerPage(item)">{{ item.name }}</p>
            </li>
        </ul>
    </section>
</template>

<script>
    import { getSimtAlbum } from '@/api/singer'
    export default {
        name: 'similarSinger',
        props: {
            singerId: {
                type: String,
            },
        },
        data() {
            return {
                artists: [],
            }
        },
        created() {
            getSimtAlbum({ id: this.singerId }).then(res => {
                this.artists = res.data.artists
            })
        },
        watch: {
            $route(to, from) {
                // 路由发生变化页面刷新
                this.$router.go(0)
            },
        },
        methods: {
            singerPage(item) {
                console.log(item.id)
                this.$router.push({
                    path: `/discover/singerdetails/${item.id}`,
                })
            },
        },
    }
</script>

<style lang="less" scoped>
    .similar-singer {
        ul {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            li {
                width: calc(~'90% / 5');
                margin-bottom: 20px;
                img {
                    width: 100%;
                    border-radius: 5px;
                    &:hover {
                        cursor: pointer;
                    }
                }
                p {
                    line-height: 30px;
                    cursor: pointer;
                }
            }
        }
    }
</style>
