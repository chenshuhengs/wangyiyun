<template>
    <section class="app">
        <headerBar class="header"></headerBar>
        <section class="content">
            <sideBar></sideBar>
            <main class="main" ref="main">
                <router-view></router-view>
            </main>
        </section>
    </section>
</template>

<script>
    import Bus from '@/utils/bus.js'
    import backTop from '@/utils/backTop.js'
    export default {
        name: 'layout',
        created() {
            Bus.$on('callBack', () => {
                backTop(document.getElementsByClassName('main')[1])
            })
        },
    }
</script>

<style lang="less" scoped>
    @import '../assets/style/variable.less';
    .app {
        width: 100%;
        height: 100vh;
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
