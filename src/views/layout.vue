<template>
    <section class="app">
        <headerBar class="header"></headerBar>
        <playPageCom></playPageCom>
        <section class="content">
            <sideBar></sideBar>
            <main class="main" ref="main">
                <router-view></router-view>
            </main>
        </section>
        <section class="buttom">
            <playMusic></playMusic>
        </section>
        <transition name="fade">
            <Login v-if="loginState"></Login>
        </transition>
    </section>
</template>

<script>
    import Login from './login'
    import Bus from '@/utils/bus.js'
    import playMusic from './playMusic'
    import playPageCom from './playPageCom'
    import backTop from '@/utils/backTop.js'
    import { createNamespacedHelpers } from 'vuex'
    const loginStore = createNamespacedHelpers('loginStore')
    export default {
        name: 'layout',
        components: {
            Login,
            playMusic,
            playPageCom,
        },
        created() {
            Bus.$on('callBack', () => {
                backTop(document.getElementsByClassName('main')[1], true)
            })
            Bus.$on('BackTop', () => {
                backTop(document.getElementsByClassName('main')[1], false)
            })
        },
        computed: {
            ...loginStore.mapState(['loginState']),
        },
    }
    // https://www.zhihu.com/zvideo/1363955208071028736
</script>

<style lang="less" scoped>
    @import '../assets/style/variable.less';
    .app {
        width: 100%;
        height: 100vh;
        position: relative;
        .content {
            display: flex;
            width: 100%;
            overflow: hidden;
            height: calc(~'100% - 120px');
            position: relative;
            .main {
                width: 100%;
                height: 100%;
                overflow: hidden;
                overflow-y: scroll;
                background-color: var(--body-bgcolor);
                &::-webkit-scrollbar {
                    width: 5px;
                }
                &::-webkit-scrollbar-thumb {
                    background: #ccc;
                    border-radius: 5px;
                }
                &::-webkit-scrollbar-thumb:hover {
                    background: #636060;
                }
            }
        }
        .buttom {
            width: 100%;
            position: absolute;
            bottom: 0;
            left: 0;
            z-index: 999;
        }
    }
</style>
