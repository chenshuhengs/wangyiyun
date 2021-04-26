<template>
    <section class="follow">
        <div>
            <i class="iconfont icon-duihaoduihaoduihao1231231-copy" v-if="judgeFollowFn" @click="followUser(0)"></i>
            <i class="iconfont icon-jia red" v-else @click="followUser(1)"></i>
            <span v-if="judgeFollowFn" @click="followUser(0)">已关注</span>
            <span v-else @click="followUser(1)">关注</span>
        </div>
        <transition name="fade">
            <PopupComp v-if="show" :message="message" :state="state"></PopupComp>
        </transition>
    </section>
</template>

<script>
    import storage from 'good-storage'
    import { getFollow, getUserFollow } from '@/api/user'
    import { createNamespacedHelpers } from 'vuex'
    import { clearTimeout } from 'timers'
    const loginStore = createNamespacedHelpers('loginStore')
    export default {
        name: 'follow',
        data() {
            return {
                myId: '',
                follow: [],
                show: false,
                state: '',
                message: '',
            }
        },
        props: {
            userId: {
                type: String,
            },
        },
        created() {},
        computed: {
            judgeFollowFn() {
                return this.followFn(this.follow)
            },
        },
        methods: {
            ...loginStore.mapMutations(['LOGIN_STATE']),
            followFn(follow) {
                for (let i = 0; i < follow.length; i++) {
                    if (follow[i].userId == this.userId) {
                        return true
                    }
                }
                return false
            },
            followUser(t) {
                if (storage.get('token')) {
                    this.myId = storage.get('id')
                    getFollow({ id: this.userId, t: t }).then(res => {
                        if ((res.data.code == 201 || res.data.code == 200) && t == 0) {
                            this.message = res.data.msg ? res.data.msg : '取消关注'
                            this.follow.forEach((e, index) => (e.userId == this.userId ? this.follow.splice(index, 1) : ''))
                            this.show = true
                            this.state = 'guanbi'
                            setTimeout(time1)
                            var time1 = setTimeout(() => {
                                this.show = false
                            }, 2000)
                        } else if ((res.data.code == 201 || res.data.code == 200) && t == 1) {
                            console.log(res)
                            this.message = res.data.followContent ? res.data.followContent : '关注成功'
                            this.message = res.data.followContent
                            this.follow.push({ userId: this.userId })
                            this.show = true
                            this.state = 'duihaoduihaoduihao1231231-copy'
                            setTimeout(time2)
                            var time2 = setTimeout(() => {
                                this.show = false
                            }, 2000)
                        }
                    })
                } else {
                    this.LOGIN_STATE(true)
                }
            },
        },
    }
</script>

<style lang="less" scoped>
    .follow {
        div {
            padding: 3px 10px;
            border: 1px solid #e0e0e0;
            border-radius: 30px;
            &:hover {
                cursor: pointer;
                background-color: rgba(187, 181, 181, 0.3);
            }
            .red {
                color: rgb(219, 24, 24);
            }
            span {
                margin-left: 10px;
            }
        }
    }
</style>
