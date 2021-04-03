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
        }
    }
</style>
