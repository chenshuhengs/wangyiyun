<!-- 
    发现音乐
-->
<template>
    <section class="song">
        <Tabs :tableList="tableList"></Tabs>
        <div class="content">
            <router-view></router-view>
        </div>
    </section>
</template>

<script>
    export default {
        name: 'discoverComponent',
        data() {
            return {
                activeName: 'personality',
                tableList: [],
            }
        },
        created() {
            this.tableList = this.$router.options.routes[0].children[0].children
        },
        methods: {},
    }
</script>

<style lang="less" scoped>
    .song {
        width: 100%;
        height: 100%;
        .content {
            width: 100%;
            height: 100%;
            padding-top: 65px;
        }
    }
</style>
