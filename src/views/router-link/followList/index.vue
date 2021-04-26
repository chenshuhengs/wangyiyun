<!-- 
    关注列表 / 粉丝列表
-->
<template>
    <section class="follow">
        <header>
            <h5 v-if="this.$route.query.name == 'newFollows'">{{ nicknam }}的关注</h5>
            <h5 v-else-if="this.$route.query.name == 'followeds'">{{ nicknam }}的粉丝</h5>
        </header>
        <div class="content">
            <ul>
                <li v-for="(follow, index) in followList" :key="index">
                    <div class="left">
                        <div class="avatar">
                            <img :src="follow.avatarUrl" alt="" />
                        </div>
                        <div class="title">
                            <div class="nickname" @click="userLink(follow)">
                                <span>{{ follow.nickname }}</span>
                            </div>
                            <div class="fans">
                                <p v-if="follow.signature">{{ follow.signature }}</p>
                                <div>
                                    <p>歌单:{{ follow.playlistCount }}</p>
                                    <p>粉丝:{{ follow.followeds }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="right">
                        <follow :userId="String(follow.userId)"></follow>
                    </div>
                </li>
            </ul>
        </div>
        <transition name="fade">
            <paging v-if="total > 30" :size="limit" :total="total" @pageJump="pageJump"></paging>
        </transition>
    </section>
</template>

<script>
    import { getUserFollows, getUserDetail, getUserfolloweds } from '@/api/user'
    export default {
        name: 'followList',
        data() {
            return {
                limit: 30,
                total: 0,
                userId: '',
                nicknam: '',
                followList: [],
            }
        },
        created() {
            this.userId = this.$route.params.id
            if (this.$route.query.name == 'newFollows') {
                getUserFollows({ id: this.userId, offset: 0 * this.limit }).then(res => {
                    this.followList = res.data.follow
                })
                getUserDetail({ id: this.userId }).then(res => {
                    this.total = res.data.profile.follows
                    this.nicknam = res.data.profile.nickname
                })
            } else if (this.$route.query.name == 'followeds') {
                getUserfolloweds({ id: this.userId }).then(res => {
                    this.followList = res.data.followeds
                    this.total = res.data.size
                })
                getUserDetail({ id: this.userId }).then(res => {
                    this.nicknam = res.data.profile.nickname
                })
            }
        },
        methods: {
            pageJump(page) {
                getUserFollows({ id: this.userId, offset: (page - 1) * this.limit }).then(res => {
                    this.followList = res.data.follow
                })
            },
            userLink(item) {
                this.$router.push({
                    path: `/discover/user/${item.userId}`,
                })
            },
        },
    }
</script>

<style lang="less" scoped>
    .follow {
        header {
            padding: 20px 20px;
            h5 {
                margin: 0;
                padding: 0;
                font-size: 20px;
                font-weight: 700;
            }
        }
        .content {
            ul {
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                li {
                    width: calc(~'95% / 2');
                    display: flex;
                    box-sizing: border-box;
                    padding: 10px 20px;
                    &:hover {
                        background-color: rgba(211, 204, 204, 0.3);
                    }
                    .left {
                        width: 70%;
                        display: flex;
                        .avatar {
                            width: 35%;
                            margin-right: 10px;
                            img {
                                width: 100%;
                                border-radius: 50%;
                            }
                        }
                        .title {
                            width: 60%;
                            display: flex;
                            flex-direction: column;
                            justify-content: space-around;
                            .nickname:hover {
                                cursor: pointer;
                                color: #000;
                            }
                            .fans {
                                p {
                                    margin: 0;
                                    color: #868282;
                                    white-space: nowrap;
                                    white-space: nowrap;
                                    overflow: hidden; /*超出部分隐藏*/
                                    text-overflow: ellipsis; /*用...代替超出部分*/
                                }
                                div {
                                    width: 100%;
                                    display: flex;
                                    justify-content: space-between;
                                    p {
                                    }
                                }
                            }
                        }
                    }
                    .right {
                        width: 30%;
                        display: flex;
                        justify-content: flex-end;
                        align-items: center;
                    }
                }
            }
        }
    }
</style>
