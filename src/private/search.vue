<template>
    <section class="search">
        <div>
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
        </div>
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
        div {
            position: relative;
        }
        input {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 25px;
            padding-left: 30px;
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
