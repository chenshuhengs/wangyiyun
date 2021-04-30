<template>
    <section class="progress">
        <!-- 进度条 -->
        <el-slider v-model="sliderTime" height="5"></el-slider>
    </section>
</template>

<script>
    export default {
        name: 'progressBar',
        data() {
            return {
                sliderTime: 0,
            }
        },
    }
</script>

<style lang="less" scoped>
    .progress {
        position: absolute;
        left: 0;
        top: -5px;
        z-index: 0;
        width: 100%;
        background-color: rgba(218, 209, 209, 0);
        box-shadow: none;
        /deep/ .el-slider__runway {
            z-index: 999;
            margin-top: 5px;
            background-color: rgba(218, 209, 209, 0);
        }
        /deep/ .el-slider__bar {
            background: rgb(221, 9, 9);
        }
        /deep/ .el-slider__button {
            z-index: 999 !important;
            border: none;
            background: rgb(241, 85, 85);
        }
    }
</style>
