<template>
    <section class="side">
        <ul>
            <router-link
                :class="{ active: routeId === item.meta.id }"
                :to="{ path: item.path }"
                tag="li"
                v-for="(item, index) in routeList"
                :key="index"
            >
                <span>{{ item.meta.name }}</span>
            </router-link>
        </ul>
    </section>
</template>

<script>
    export default {
        name: 'sideBar',
        created() {},
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
        width: 250px;
        height: 100%;
        border-right: 1px solid #e0e0e0;
        background-color: var(--menu-bgcolor);
        .active {
            color: @theme-color;
            background: var(--menu-item-active-bg);
        }

        li {
            span {
                font-size: @font-size-medium-sm;
            }
            &:hover {
                background: var(--menu-item-hover-bg);
            }
        }
    }
</style>
