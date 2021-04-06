<template>
    <section class="app">
        <headerBar class="header"></headerBar>
        <section class="content">
            <sideBar></sideBar>
            <main class="main">
                <router-view></router-view>
            </main>
        </section>
    </section>
</template>

<script>
    export default {
        name: 'layout',
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
            height: 100%;
            overflow: hidden;
            height: calc(~'100% - 50px');
            .main {
                width: 100%;
                height: 100%;
                // margin: 30px 50px 0 50px;
                padding: 0 50px;
                // overflow: hidden;
                overflow-y: scroll;
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
