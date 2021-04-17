<template>
    <section class="content">
        <slot></slot>
        <ul>
            <li v-for="(item, index) in contentList" :key="index" :class="screenWidth > 1800 ? 'li1' : 'li2'">
                <div class="top">
                    <img :src="item.picUrl" alt="" />
                    <p class="name">{{ item.name }}</p>
                </div>
                <p class="bottom">{{ item.rcmdtext }}</p>
            </li>
        </ul>
    </section>
</template>

<script>
    import { debounce } from 'lodash-es'
    export default {
        name: 'contentList',
        props: {
            contentList: {
                type: Array,
                default: () => [],
            },
        },
        data() {
            return {
                arr: [],
                screenWidth: '',
            }
        },
        created() {
            this.calc()
        },
        methods: {
            calc() {
                this.screenWidth = document.body.clientWidth
            },
        },
        mounted() {
            window.addEventListener('resize', debounce(this.calc, 1000))
        },
    }
</script>

<style lang="less" scoped>
    @import '../../../assets/style/mixins.less';
    .content {
        ul {
            .flex();
            .li1 {
                width: calc(~'95% / 6');
                animation: 0.5s fadeIn1 forwards;
                @keyframes fadeIn1 {
                    0% {
                        width: 19%;
                    }
                    100% {
                        width: 15.8%;
                    }
                }
            }
            .li2 {
                width: calc(~'95% / 5');
                // width: 24%;
                animation: 0.4s fadeIn2 forwards;
                @keyframes fadeIn2 {
                    0% {
                        width: 15.8%;
                    }
                    100% {
                        width: 19%;
                    }
                }
                &:nth-of-type(6) {
                    display: none;
                }
            }
            li {
                div {
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                    position: relative;
                    margin-bottom: 10px;
                    img {
                        width: 100%;
                        border: 1px solid #e0e0e0;
                    }
                    .name {
                        .line();
                        width: 100%;
                        color: #fff;
                        font-size: 18px;
                        white-space: nowrap;
                        .position4(10px,5px);
                    }
                }
                .bottom {
                    .twoline();
                }
            }
        }
    }
</style>
