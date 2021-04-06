<!-- 
    发现音乐
-->
<template>
    <section class="song"></section>
</template>

<script>
    export default {
        name: 'discoverComponent',
        data() {
            return {
                tableList: [],
            }
        },
        created() {
            this.tableList = this.$router.options.routes[0].children.filter(e => e.meta.show === false)
        },
        methods: {},
    }
</script>

<style lang="less" scoped>
    .song {
        .tab-item {
            /deep/ .el-tabs__nav-wrap::after {
                background-color: #fff;
            }
            /deep/ .el-tabs__active-bar {
                background: red;
            }
            /deep/ .el-tabs__item.is-active {
                font-size: 22px;
                color: #000;
                &:hover {
                    color: #000;
                }
            }
            /deep/ .el-tabs__item {
                &:hover {
                    color: red;
                }
            }
        }
    }
</style>
