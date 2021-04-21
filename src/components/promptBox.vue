<!-- 
    提示框
-->
<template>
    <section class="tips">
        <div>{{ message }}</div>
    </section>
</template>

<script>
    export default {
        name: 'promptBox',
        props: {
            message: {
                type: String,
            },
        },
    }
</script>

<style lang="less" scoped></style>
