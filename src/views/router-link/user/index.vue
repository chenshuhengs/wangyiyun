<!-- 
    用户的子路由
-->
<template>
    <section class="user">
        <div class="header">
            <div class="avatar">
                <img :src="avatarUrl" alt="" />
            </div>
            <div class="introduce">
                <div class="top">
                    <div v-if="userInit.profile">
                        <p class="nickname">
                            {{ userInit.profile.nickname }}
                        </p>
                        <p>
                            <span>Lv{{ userInit.level }}</span>
                            <i v-if="userInit.profile.gender == 1" class="iconfont icon-82 nan"></i>
                            <i v-if="userInit.profile.gender == 2" class="iconfont icon-nv nv"></i>
                        </p>
                    </div>
                    <div class="function">
                        <privateLetter></privateLetter>
                        <follow :userId="userId" style="margin-left: 30px"></follow>
                    </div>
                </div>
                <div class="bottom">
                    <div class="details">
                        <div>
                            <p v-if="userDynamic">{{ userDynamic.size }}</p>
                            <p>动态</p>
                        </div>
                        <div @click="userFollowFn">
                            <p v-if="userFollow">{{ userFollow.follow.length }}</p>
                            <p>关注</p>
                        </div>
                        <div>
                            <p v-if="userFans">{{ userFans.size }}</p>
                            <p>粉丝</p>
                        </div>
                    </div>
                    <div class="personal">
                        <span>个人介绍:</span>
                        <span v-if="userInit">{{ userInit.profile.signature }}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="content">
            <h5>
                歌单
                <span v-if="songSheet.ordinary">({{ songSheet.ordinary.length }})</span>
            </h5>
            <!-- 普通歌单 -->
            <ul class="ordinary">
                <li v-for="(item, index) in songSheet.ordinary" :key="index">
                    <div>
                        <img :src="item.coverImgUrl" alt="" />
                    </div>
                    <p>{{ item.name }}</p>
                    <p>{{ item.trackCount }}首</p>
                </li>
            </ul>
            <h5>
                收藏
                <span v-if="songSheet.Collection">({{ songSheet.Collection.length }})</span>
            </h5>
            <!-- 收藏歌单 -->
            <ul class="ordinary">
                <li v-for="(item, index) in songSheet.Collection" :key="index">
                    <div>
                        <img :src="item.coverImgUrl" alt="" />
                    </div>
                    <p>{{ item.name }}</p>
                    <p>{{ item.trackCount }}首</p>
                </li>
            </ul>
        </div>
    </section>
</template>

<script>
    import { getUserEvent, getUserFollows, getUserfolloweds, getUserDetail, getUserPlaylist } from '@/api/user'
    export default {
        name: 'user',
        data() {
            return {
                level: '',
                userId: '',
                userInit: '',
                avatarUrl: '',
                userFans: 0, //用户粉丝
                userFollow: 0, //用户关注
                userDynamic: 0, //用户动态
                songSheet: {
                    ordinary: [], //普通歌单
                    Collection: [], //收藏歌单
                },
            }
        },
        created() {
            this.userId = this.$route.params.key
            //用户动态
            getUserEvent({ id: this.userId }).then(res => {
                this.userDynamic = res.data
            })
            // 用户关注
            getUserFollows({ id: this.userId }).then(res => {
                this.userFollow = res.data
            })
            // 粉丝
            getUserfolloweds({ id: this.userId }).then(res => {
                this.userFans = res.data
            })
            getUserDetail({ id: this.userId }).then(res => {
                this.avatarUrl = res.data.profile.avatarUrl
                this.userInit = res.data
            })
            getUserPlaylist({ id: this.userId }).then(res => {
                res.data.playlist.forEach(e => {
                    e.ordered ? this.songSheet.Collection.push(e) : this.songSheet.ordinary.push(e)
                })
            })
        },
        methods: {
            userFollowFn() {
                this.$router.push({
                    path: `/discover/follow/${this.userId}`,
                    query: {
                        name: this.userInit.profile.nickname,
                    },
                })
            },
        },
    }
</script>

<style lang="less" scoped>
    .user {
        padding: 30px 0;
        position: relative;
        .header {
            padding: 0 30px;
            display: flex;
            justify-content: space-between;
            width: 100%;
            .avatar {
                width: 22%;
                img {
                    width: 100%;
                    border-radius: 50%;
                }
            }
            .introduce {
                width: 70%;
                .top {
                    display: flex;
                    padding-bottom: 35px;
                    align-items: flex-end;
                    justify-content: space-between;
                    border-bottom: 1px solid #e0e0e0;
                    .function {
                        display: flex;
                    }
                    div {
                        p {
                            margin: 0;
                        }
                    }
                    .nickname {
                        font-weight: 700;
                        font-size: 20px;
                        letter-spacing: 1px;
                        margin-bottom: 20px;
                    }
                    span {
                        background: rgba(155, 146, 146, 0.3);
                        padding: 1px 5px;
                        border-radius: 10px;
                        margin-right: 10px;
                    }
                    i {
                        padding: 2px;
                        font-weight: 700;
                        border-radius: 50%;
                    }
                    .nan {
                        color: rgb(52, 99, 240);

                        background: rgba(23, 172, 218, 0.3);
                    }
                    .nv {
                        color: rgb(238, 113, 133);
                        background: rgba(235, 144, 159, 0.3);
                    }
                }
                .bottom {
                    .details {
                        display: flex;
                        margin-top: 30px;
                        div {
                            padding: 0 30px;
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            align-items: center;
                            color: rgb(95, 93, 93);
                            p {
                                margin: 0;
                            }
                            &:hover {
                                color: #000;
                                cursor: pointer;
                            }
                        }
                    }
                    .personal {
                        font-size: 16px;
                        font-weight: 200;
                        margin-top: 30px;
                    }
                }
            }
        }
        .content {
            margin-top: 40px;
            h5 {
                padding: 0 30px;
                font-size: 20px;
                span {
                    font-size: 14px;
                }
                &:nth-of-type(2) {
                    margin-top: 40px;
                }
            }
            .ordinary {
                padding: 0px 20px;
                display: flex;
                flex-wrap: wrap;
                justify-content: flex-start;
                li {
                    width: calc(~'100% / 4');
                    padding: 10px 10px;
                    div {
                        img {
                            width: 100%;
                            border-radius: 10px;
                            border: 1px solid #e0e0e0;
                        }
                        margin-bottom: 10px;
                    }
                    p {
                        margin: 0;
                    }
                }
            }
        }
    }
</style>
