<template>
    <section class="private">
        <div>
            <i class="iconfont icon-xinfeng"></i>
            <span>发私信</span>
        </div>
    </section>
</template>

<script>
    export default {
        name: 'privateLetter',
    }
</script>

<style lang="less" scoped>
    .private {
        div {
            padding: 3px 10px;
            border: 1px solid #e0e0e0;
            border-radius: 30px;
            &:hover {
                cursor: pointer;
                background-color: rgba(187, 181, 181, 0.3);
            }
            span {
                margin-left: 10px;
            }
        }
    }
</style>
