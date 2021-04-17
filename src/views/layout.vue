<template>
    <section class="app">
        <headerBar class="header"></headerBar>
        <section class="content">
            <sideBar></sideBar>
            <main class="main" ref="main">
                <router-view></router-view>
            </main>
        </section>
        <transition name="fade">
            <Login v-if="loginState"></Login>
        </transition>
    </section>
</template>

<script>
    import Login from './login'
    import Bus from '@/utils/bus.js'
    import backTop from '@/utils/backTop.js'
    import { createNamespacedHelpers } from 'vuex'
    const loginStore = createNamespacedHelpers('loginStore')
    export default {
        name: 'layout',
        components: {
            Login,
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
            .main {
                width: 100%;
                height: 100%;
                padding: 0 50px;
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
    }
</style>
