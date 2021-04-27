<!-- 
    歌手榜
-->
<template>
    <section class="singerlist">
        <div class="header">
            <h5>云音乐歌手榜</h5>
            <ul>
                <li v-for="(item, index) in list" :key="index">
                    <span @click="singerList(item.name, item.type)" :class="[name == item.name ? 'active' : '']">{{ item.name }}</span>
                </li>
            </ul>
        </div>
        <div class="content">
            <singerList :type="type"></singerList>
        </div>
    </section>
</template>

<script>
    import singerList from './singerList/index'
    export default {
        name: 'singerlist',
        data() {
            return {
                name: '华语',
                type: 1,
                list: [
                    {
                        name: '华语',
                        type: 1,
                    },
                    {
                        name: '欧美',
                        type: 2,
                    },
                    {
                        name: '韩国',
                        type: 3,
                    },
                    {
                        name: '日本',
                        type: 4,
                    },
                ],
            }
        },
        components: {
            singerList,
        },
        methods: {
            singerList(name, type) {
                this.name = name
                this.type = type
            },
        },
    }
</script>

<style lang="less" scoped>
    .singerlist {
        .header {
            padding: 30px;
            h5 {
                font-weight: 700;
                font-size: 20px;
                margin: 0;
            }
            ul {
                display: flex;
                margin-top: 30px;
                padding-bottom: 10px;
                border-bottom: 1px solid #e0e0e0;
                li {
                    font-size: 16px;
                    margin-right: 20px;
                    color: #757171;
                    .active {
                        color: #000;
                        // font-weight: 600;
                        font-size: 18px;
                    }
                }
            }
        }
    }
</style>
