<template>
    <section class="tabbar">
        <div class="am-list">
            <div class="left" @click="popupdisplay">全部歌单〉</div>
            <ul class="right">
                <li v-for="(tag, index) in tags" :key="index" :class="actiove == index ? 'active' : ''" @click="cutTabClick(index)">
                    {{ tag.name }}
                </li>
            </ul>
        </div>
        <transition name="fade">
            <Popup v-if="show"></Popup>
        </transition>
    </section>
</template>

<script>
    import Popup from './Popup'
    export default {
        name: 'tabBar',
        data() {
            return {
                show: false,
                actiove: 0,
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
            cutTabClick(index) {
                this.show = false
                this.actiove = index
            },
            popupdisplay() {
                this.show = !this.show
            },
        },
    }
</script>

<style lang="less" scoped>
    @import '../../../assets/style/mixins.less';
    .tabbar {
        position: relative;
        .am-list {
            font-size: 12px;
            .flex(nowrap);
            display: flex;
            align-items: center;
            .left {
                width: 100px;
                white-space: nowrap;
                padding: 4px 0px;
                border-radius: 30px;
                text-align: center;
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
