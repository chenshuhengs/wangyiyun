<template>
    <section class="header">
        <div class="left">
            <div @click="homepage" class="operation red"><Icon :size="9" name="zhuye"></Icon></div>
            <div @click="narrow" class="operation yellow"><Icon :size="9" name="suoxiao"></Icon></div>
            <div @click="enlarge" class="operation green"><Icon :size="9" name="icon--"></Icon></div>
        </div>
        <div class="right">
            <div class="search-wrap"><search></search></div>
            <Theme></Theme>
        </div>
    </section>
</template>

<script>
    import Theme from '@/private/theme'
    import search from '@/private/search'
    import { requestFullScreen, exitFullscreen, isFullscreen } from '@/utils/pageScaling.js'
    export default {
        name: 'headerBar',
        data() {
            return {}
        },
        components: { Theme, search },
        methods: {
            // 回到主页
            homepage() {
                this.$router.push('/')
            },
            // 缩小
            narrow() {
                if (isFullscreen()) {
                    exitFullscreen()
                }
            },
            // 放大
            enlarge() {
                requestFullScreen()
            },
        },
    }
</script>

<style lang="less" scoped>
    @import '../assets/style/mixins.less';
    @import '../assets/style/variable.less';
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 50px;
        height: 50px;
        background-color: var(--header-bgcolor);
        .left {
            display: flex;
            line-height: 2.604167rem;
            .operation {
                .round(20px);
                .flex-center;
                margin-right: 8px;
                &.red {
                    background: #ed655a;
                }

                &.green {
                    background: #72be47;
                }

                &.yellow {
                    background: #e0c04c;
                }
                &:hover {
                    i {
                        opacity: 1;
                    }
                }
                i {
                    opacity: 0;
                    transition: opacity 0.3s;
                    color: @black;
                    font-weight: @font-weight-bold;
                }
            }
        }
        .right {
            display: flex;
            align-items: center;
            .search-wrap {
                margin-right: 16px;
            }
        }
    }
</style>
