<!-- 
    个性推荐 mv 组件
-->
<template>
    <section class="mv">
        <slot name="title"></slot>
        <slot name="content"></slot>
    </section>
</template>

<script>
    export default {
        name: 'mvComponent',
    }
</script>

<style lang="less" scoped></style>
