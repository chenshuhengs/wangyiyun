<template>
    <section class="side">
        <ul>
            <router-link :to="{ path: item.path }" v-for="(item, index) in routeList" :key="index">
                <li :class="{ active: routeId === item.meta.id }">
                    <span>{{ item.meta.name }}</span>
                </li>
            </router-link>
        </ul>
    </section>
</template>

<script>
    export default {
        name: 'sideBar',
        computed: {
            routeList() {
                return this.$router.options.routes[0].children.filter(e => e.meta.show)
            },
            routeId() {
                return this.$route.meta.id
            },
        },
    }
</script>

<style lang="less" scoped>
    @import '../assets/style/variable.less';
    .side {
        width: 320px;
        height: 100%;
        border-right: 1px solid #e0e0e0;
        background-color: var(--menu-bgcolor);
        .active {
            color: @theme-color;
            background: var(--menu-item-active-bg);
        }

        li {
            display: flex;
            flex-direction: column;
            padding: 10px 0 10px 20px;
            color: var(--font-color);
            span {
                font-size: @font-size-medium-sm;
            }
            &:hover {
                background: var(--menu-item-hover-bg);
            }
        }
    }
</style>
