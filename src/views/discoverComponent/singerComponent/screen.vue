<template>
    <section class="screen">
        <!-- 语种 -->
        <div class="languages">
            <div>{{ screenSinger[0].type }}:</div>
            <ul>
                <li v-for="(item, index) in screenSinger[0].list" :key="index" @click="screenSingerFn('语种', item.name, item.type)">
                    <span :class="item.name == languagesName ? 'active' : ''">{{ item.name }}</span>
                </li>
            </ul>
        </div>
        <!-- 分类 -->
        <div class="classification">
            <div>{{ screenSinger[1].type }}:</div>
            <ul>
                <li v-for="(item, index) in screenSinger[1].list" :key="index" @click="screenSingerFn('分类', item.name, item.type)">
                    <span :class="item.name == classificationName ? 'active' : ''">{{ item.name }}</span>
                </li>
            </ul>
        </div>
        <!-- 筛选 -->
        <div class="screen">
            <div>{{ screenSinger[2].type }}:</div>
            <ul>
                <li v-for="(item, index) in screenSinger[2].list" :key="index" @click="screenSingerFn('筛选', item.name, item.type)">
                    <span :class="item.name == screenName ? 'active' : ''">{{ item.name }}</span>
                </li>
            </ul>
        </div>
    </section>
</template>

<script>
    import { createNamespacedHelpers } from 'vuex'
    const singerStore = createNamespacedHelpers('singerStore')
    import { getTopArtists, getArtistList } from '@/api/singer'
    export default {
        name: 'Screen',
        data() {
            return {
                artistsList: [],
                screenSinger: [
                    {
                        type: '语种',
                        list: [
                            { name: '全部', type: -1 },
                            { name: '华语', type: 7 },
                            { name: '欧美', type: 96 },
                            { name: '日本', type: 8 },
                            { name: '韩国', type: 16 },
                            { name: '其他', type: 0 },
                        ],
                    },
                    {
                        type: '分类',
                        list: [
                            { name: '全部', type: -1 },
                            { name: '男歌手', type: 1 },
                            { name: '女歌手', type: 2 },
                            { name: '乐队组合', type: 3 },
                        ],
                    },
                    {
                        type: '筛选',
                        list: [
                            { name: '热门', type: -1 },
                            { name: 'A', type: 'a' },
                            { name: 'B', type: 'b' },
                            { name: 'C', type: 'c' },
                            { name: 'D', type: 'd' },
                            { name: 'E', type: 'e' },
                            { name: 'F', type: 'f' },
                            { name: 'G', type: 'g' },
                            { name: 'H', type: 'h' },
                            { name: 'I', type: 'i' },
                            { name: 'J', type: 'j' },
                            { name: 'K', type: 'k' },
                            { name: 'L', type: 'l' },
                            { name: 'M', type: 'm' },
                            { name: 'N', type: 'n' },
                            { name: 'O', type: 'o' },
                            { name: 'P', type: 'p' },
                            { name: 'Q', type: 'q' },
                            { name: 'R', type: 'r' },
                            { name: 'S', type: 's' },
                            { name: 'T', type: 't' },
                            { name: 'U', type: 'u' },
                            { name: 'V', type: 'v' },
                            { name: 'W', type: 'w' },
                            { name: 'X', type: 'x' },
                            { name: 'Y', type: 'y' },
                            { name: 'Z', type: 'z' },
                            { name: '#', type: '#' },
                        ],
                    },
                ],
            }
        },
        created() {
            let img = require('@/assets/image/geshou.jpg')
            let screenType = this.$store.state.singerStore.screenType //筛选
            let languagesType = this.$store.state.singerStore.languagesType //语种
            let classificationType = this.$store.state.singerStore.classificationType //分类
            getArtistList({ type: classificationType, area: languagesType, initial: screenType }).then(res => {
                if (res.data.code) {
                    this.artistsList = res.data.artists
                }
            })
            getTopArtists().then(res => {
                // console.log(res)
            })
        },
        methods: {
            ...singerStore.mapMutations([
                'SCREEN_TYPE',
                'SCREEN_NAME',
                'LANGUAGES_TYPE',
                'LANGUAGES_NAME',
                'CLASSIFICATION_TYPE',
                'CLASSIFICATION_NAME',
            ]),
            screenSingerFn(title, name, type) {
                if (title == '语种') {
                    this.LANGUAGES_NAME(name)
                    this.LANGUAGES_TYPE(type)
                } else if (title == '分类') {
                    this.CLASSIFICATION_NAME(name)
                    this.CLASSIFICATION_TYPE(type)
                } else if (title == '筛选') {
                    this.SCREEN_NAME(name)
                    this.SCREEN_TYPE(type)
                }
            },
        },
        computed: {
            ...singerStore.mapState(['screenName', 'languagesName', 'classificationName']),
        },
    }
</script>

<style lang="less" scoped>
    .screen {
        margin-top: 10px;
        .languages,
        .classification,
        .screen {
            display: flex;
            margin: 0;
            div {
                width: 4%;
            }
            ul {
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                li {
                    display: flex;
                    justify-content: center;
                    width: calc(~'100% / 10');
                    margin-bottom: 10px;
                    span {
                        padding: 1px 8px;
                        border-radius: 10px;
                    }
                    .active {
                        color: red;
                        background-color: rgba(240, 157, 171, 0.3);
                    }
                }
            }
        }
    }
</style>
