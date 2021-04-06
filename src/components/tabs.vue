<template>
    <section class="tabs">
        <ul>
            <li v-for="(table, index) in tableList" :key="index">
                <router-link :to="table.path">
                    <span>{{ table.meta.label }}</span>
                </router-link>
            </li>
        </ul>
    </section>
</template>

<script>
    export default {
        name: 'Tabs',
        props: {
            tableList: {
                type: Array,
                default: () => [],
            },
        },
    }
</script>

<style lang="less" scoped>
    @import '../assets/style/variable.less';
    .tabs {
        ul {
            display: flex;
            align-items: center;
            li {
                display: flex;
                align-items: center;
                font-size: 18px;
                height: 40px;
                margin-right: 20px;
                .router-link-active {
                    font-weight: @font-weight-bold;
                    border-bottom: 3px solid @theme-color;
                    font-size: 22px;
                }
            }
        }
    }
</style>
