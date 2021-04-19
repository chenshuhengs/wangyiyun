<!-- 
    用户信息弹窗
-->
<template>
    <section class="user-popup">
        <div class="top">
            <div class="content">
                <div @click="userInit(1)">
                    <span class="size">{{ dynamic.size }}</span>
                    <span class="title">动态</span>
                </div>
                <div @click="userInit(2)">
                    <span class="size">{{ follow.length }}</span>
                    <span class="title">关注</span>
                </div>
                <div @click="userInit(3)">
                    <span class="size">{{ fans.size }}</span>
                    <span class="title">粉丝</span>
                </div>
            </div>
            <div class="btn"><span>签到</span></div>
        </div>
        <div class="center"></div>
        <div class="bottom"></div>
    </section>
</template>

<script>
    import { createNamespacedHelpers } from 'vuex'
    const loginStore = createNamespacedHelpers('loginStore')
    import { getFans, getFollow, getUserdynamic } from '@/api/login'
    export default {
        name: 'userPopup',
        props: {
            id: {
                type: Number,
            },
        },
        data() {
            return {
                fans: '',
                follow: '',
                dynamic: '',
            }
        },
        created() {
            getFans(this.id).then(res => {
                this.fans = res.data
            })
            getUserdynamic(this.id).then(res => {
                this.dynamic = res.data
            })
            getFollow(this.id).then(res => {
                this.follow = res.data.follow
            })
        },
        methods: {
            ...loginStore.mapMutations(['POPUP']),
            ...loginStore.mapActions(['getFansFn', 'getFollowFn', 'getUserdynamicFn']),
            userInit(key) {
                this.$router.push({
                    path: `/discover/user/${key}`,
                    query: {
                        uid: this.id,
                    },
                })
                this.POPUP(false)
            },
        },
    }
</script>

<style lang="less" scoped>
    @import '../../assets/style/mixins.less';
    .user-popup {
        z-index: 999;
        width: 270px;
        height: 360px;
        border: 1px solid #e0e0e0;
        border-radius: 10px;
        background: var(--body-bgcolor);
        .position1(-50px,40px);
        display: flex;
        flex-direction: column;
        .top,
        .center,
        .bottom {
            height: calc(~'100% / 3');
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: center;
        }
        .top {
            border-bottom: 1px solid #e0e0e0;

            .content {
                width: 100%;
                display: flex;
                justify-content: space-around;
                div {
                    display: flex;
                    align-items: center;
                    flex-direction: column;
                    justify-content: center;
                    .size {
                        font-weight: 700;
                        font-size: 18px;
                    }
                    .title {
                        font-size: 16px;
                        color: rgb(117, 113, 113);
                    }
                    &:hover {
                        .cursor();
                        .title {
                            color: #000;
                        }
                    }
                }
            }
            .btn {
                width: calc(~'100% / 3');
                text-align: center;
                border-radius: 30px;
                font-size: 16px;
                padding: 5px 0;
                margin-top: 20px;
                border: 1px solid #e0e0e0;
                &:hover {
                    background-color: rgba(185, 174, 174, 0.3);
                }
            }
        }
    }
</style>
