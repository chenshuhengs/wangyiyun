<template>
    <section class="popup">
        <div>
            <span>{{ message }}</span>
            <i :class="`iconfont icon-${state}`"></i>
        </div>
    </section>
</template>

<script>
    export default {
        name: 'PopupComp',
        props: {
            state: {
                type: String,
                default: '',
            },
            message: {
                type: String,
            },
        },
    }
</script>

<style lang="less" scoped>
    .popup {
        position: absolute;
        left: 27%;
        top: 7%;
        margin: 0;
        padding: 0;
        z-index: 999;
        div {
            background-color: rgba(0, 0, 0, 0.8);
            border-radius: 10px;
            padding: 30px 50px;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 999;
            span {
                color: #fff;
                font-size: 24px;
                font-weight: 700;
                text-align: center;
                margin-right: 20px;
            }
            i {
                font-size: 24px;
                font-weight: 700;
                text-align: center;
                background: #fff;
                padding: 5px 8px;
                border-radius: 50%;
            }
        }
    }
</style>
