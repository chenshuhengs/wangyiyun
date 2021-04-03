<template>
    <section class="search">
        <input
            type="text"
            v-on:click="onClickInput"
            @input="onInput"
            @keypress.enter="onEnterPress"
            v-model.trim="searchValue"
            placeholder="搜索"
            ref="input"
        />
        <Icon :size="9" name="fangdajing" class="icon"></Icon>
    </section>
</template>

<script>
    export default {
        name: 'search',
        data() {
            return {
                searchValue: '',
            }
        },
        methods: { onClickInput() {}, onEnterPress() {}, onInput() {} },
    }
</script>

<style lang="less" scoped>
    .search {
        position: relative;
        width: 150px;
        input {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 25px;
            padding: 0 0 0 30px;
            box-sizing: border-box;
            border-radius: 20px;
            border: none;
            outline: none;
            background: var(--header-input-bgcolor);
        }
        .icon {
            position: absolute;
            top: 4px;
            left: 10px;
        }
    }
</style>
