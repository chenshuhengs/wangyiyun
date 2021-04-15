<!-- 
    分页组件
-->
<template>
    <section class="paging">
        <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage1"
            :page-size="100"
            layout="pager"
            :total="total"
        ></el-pagination>
    </section>
</template>

<script>
    import Bus from '@/utils/bus.js'
    export default {
        name: 'paging',
        props: {
            total: {
                type: Number,
                default: 0,
            },
        },
        data() {
            return {
                currentPage1: 1,
            }
        },
        methods: {
            // 换页时触发
            handleCurrentChange(page) {
                Bus.$emit('BackTop')
                this.$emit('pageJump', page)
            },
        },
    }
</script>

<style lang="less" scoped>
    .paging {
        display: flex;
        justify-content: center;
    }
</style>
