<template>
    <section class="tabbar">
        <div class="am-list">
            <div class="left" @click="popupdisplay">
                <span v-if="activeLable == '全部'">全部歌单</span>
                <span v-else>{{ activeLable }}</span>
            </div>
            <ul class="right">
                <li v-for="(tag, index) in tags" :key="index" :class="activeLable == tag.name ? 'active' : ''" @click="cutTabClick(tag, index)">
                    {{ tag.name }}
                </li>
            </ul>
        </div>
        <transition name="fade">
            <Popup v-if="popUpClose"></Popup>
        </transition>
    </section>
</template>

<script>
    import Popup from './Popup'
    import { createNamespacedHelpers } from 'vuex'
    const discoverStore = createNamespacedHelpers('discoverStore')
    export default {
        name: 'tabBar',
        data() {
            return {
                show: false,
                name: '',
            }
        },
        components: {
            Popup,
        },
        props: {
            tags: {
                type: Array,
                default: () => [],
            },
        },
        methods: {
            ...discoverStore.mapMutations(['ACIVE_LABLE', 'POP_UP_CLOST']),
            ...discoverStore.mapActions({
                getBoutiqueSong: 'getBoutiqueSong',
                getBoutiqueList: 'getBoutiqueList',
            }),
            cutTabClick(tag, index) {
                this.show = false
                this.name = tag.name
                this.active = index
                this.ACIVE_LABLE(tag.name)
                this.POP_UP_CLOST(this.show)
                this.getBoutiqueSong()
                this.$emit('tabClick')
            },
            popupdisplay() {
                this.show = !this.show
                this.POP_UP_CLOST(this.show)
            },
        },
        computed: {
            ...discoverStore.mapState(['popUpClose']),
            ...discoverStore.mapState(['activeLable']),
        },
    }
</script>

<style lang="less" scoped>
    @import '../../../assets/style/mixins.less';
    .tabbar {
        position: relative;
        margin: 15px 0;
        .am-list {
            font-size: 18px;
            .flex(nowrap);
            display: flex;
            align-items: center;
            .left {
                width: 90px;
                z-index: 899;
                padding: 4px 0px;
                text-align: center;
                border-radius: 30px;
                white-space: nowrap;
                border: 1px solid #7e7a7a;
                &:hover {
                    background: rgba(109, 106, 106, 0.2);
                }
            }
            ul {
                display: flex;
                li {
                    margin-left: 7px;
                    color: #7e7a7a;
                    padding: 2px 7px;
                    border-radius: 40px;
                    white-space: nowrap;
                    &:hover {
                        color: #424141;
                    }
                }
                .active {
                    color: red !important;
                    background: rgba(236, 168, 168, 0.3);
                }
            }
        }
    }
</style>
