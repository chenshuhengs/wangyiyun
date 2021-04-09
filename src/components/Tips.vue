<template>
    <div class="tips">
        <div class="content" @click="backToTheTop">
            <div>回到顶部</div>
            <Icon :size="12" name="shengdanjianhuahuidaodingbu"></Icon>
        </div>
    </div>
</template>

<script>
    import Bus from '@/utils/bus.js'
    export default {
        name: 'Tips',
        methods: {
            backToTheTop() {
                Bus.$emit('callBack')
            },
        },
    }
</script>

<style lang="less" scoped>
    .tips {
        display: flex;
        justify-content: center;
        padding: 50px 0 50px 0;
        .content {
            width: 20%;
            display: flex;
            padding: 5px 0;
            font-size: 16px;
            border-radius: 5px;
            align-items: center;
            justify-content: center;
            color: rgb(231, 14, 14);
            div {
                margin-right: 20px;
            }
            border: 1px solid rgb(231, 14, 14);
            &:hover {
                background: rgba(250, 3, 3, 0.1);
            }
        }
    }
</style>
