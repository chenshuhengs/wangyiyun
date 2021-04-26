<!-- 
    动态列表
-->
<template>
    <section class="dynamic">
        <header>
            <h5>{{ nickname }}的动态</h5>
        </header>
        <div class="content">
            <ul
                class="infinite-list"
                v-infinite-scroll="load"
                :infinite-scroll-immediate="false"
                infinite-scroll-distance="0"
                infinite-scroll-delay="300"
                :infinite-scroll-disabled="false"
            >
                <li v-for="(item, index) in dynamicList" :key="index" class="infinite-list-item">
                    <div class="avatar">
                        <img :src="item.user.avatarUrl" alt="" />
                    </div>
                    <div class="userinit">
                        <p>
                            {{ item.user.nickname }}
                        </p>
                        <p>
                            {{ timeFn(item.eventTime) }}
                        </p>
                        <p v-if="item.json.msg" class="msg">
                            {{ item.json.msg }}
                        </p>
                        <div class="function" v-if="item.json.mv">
                            <p v-if="item.topEvent" @click="putItAway(item, index)">
                                <i class="iconfont icon-xiangshangshouqi"></i>
                                <span>收起</span>
                            </p>
                            <p v-if="item.topEvent" @click="mvRouterLink(item.json.mv.id)">
                                <i class="iconfont icon-tiaozhuan"></i>
                                <span>{{ item.json.mv.name }}</span>
                            </p>
                        </div>
                        <p v-if="item.json.mv" class="mv">
                            <img v-if="!item.topEvent" :src="item.json.mv.imgurl16v9" alt="" />
                            <i class="iconfont icon-bofang222" :class="item.topEvent ? 'bofang' : ''" @click="playMv(item.json.mv.id, index)"></i>
                            <video v-if="item.topEvent" controls :src="item.mvUrl">您的浏览器不支持 video 标签。</video>
                        </p>
                    </div>
                </li>
            </ul>
        </div>
        <Tips></Tips>
    </section>
</template>

<script>
    import { timeDate } from '@/utils/'
    import Tips from '@/components/Tips'
    import { getMvAddress } from '@/api/ranking'
    import { getUserDetail, getUserEvent } from '@/api/user.js'
    export default {
        name: 'dynamic',
        data() {
            return {
                size: 30,
                userId: '',
                nickname: '',
                dynamicList: [],
            }
        },
        created() {
            this.userId = this.$route.params.id
            getUserEvent({ id: this.userId, limit: this.size }).then(res => {
                this.dynamicList = res.data.events
                this.dynamicList.forEach((e, index) => {
                    this.dynamicList[index]['json'] = JSON.parse(e.json)
                    if (this.dynamicList[index]['json']['mv']) {
                        getMvAddress(this.dynamicList[index]['json']['mv']['id']).then(res => {
                            this.dynamicList[index].mvUrl = res.data.data.url
                        })
                    }
                })
            })
            getUserDetail({ id: this.userId }).then(res => {
                this.nickname = res.data.profile.nickname
            })
        },
        methods: {
            load() {
                this.size += 30
                getUserEvent({ id: this.userId, limit: this.size }).then(res => {
                    if (res.data.more) {
                        this.dynamicList = res.data.events
                        this.dynamicList.forEach((e, index) => {
                            this.dynamicList[index]['json'] = JSON.parse(e.json)
                            if (this.dynamicList[index]['json']['mv']) {
                                getMvAddress(this.dynamicList[index]['json']['mv']['id']).then(res => {
                                    this.dynamicList[index].mvUrl = res.data.data.url
                                })
                            }
                        })
                    }
                })
            },
            timeFn(time) {
                return timeDate(time)
            },
            playMv(id, index) {
                this.dynamicList[index].topEvent = true
            },
            // 收起
            putItAway(item) {
                item.topEvent = false
            },
            mvRouterLink(item) {
                this.$router.push({
                    path: `/discover/mv/${item}`,
                })
            },
        },
    }
</script>

<style lang="less" scoped>
    .dynamic {
        padding: 0px 30px;
        header {
            padding: 20px 0px;
            h5 {
                margin: 0;
                padding: 0;
                font-size: 20px;
                font-weight: 700;
            }
        }
        .content {
            ul {
                li {
                    display: flex;
                    padding: 30px 0;
                    border-bottom: 1px solid #e0e0e0;
                    .avatar {
                        width: 7%;
                        margin-right: 20px;
                        img {
                            width: 100%;
                            border-radius: 50%;
                        }
                    }
                    .userinit {
                        width: 93%;
                        .msg {
                            white-space: pre-line;
                            line-height: 25px;
                        }
                        .mv {
                            position: relative;
                            width: 100%;
                            .bofang {
                                opacity: 0;
                            }
                            img {
                                width: 50%;
                                border-radius: 5px;
                            }
                            i {
                                position: absolute;
                                font-size: 18px;
                                color: #fff;
                                left: 23%;
                                bottom: 45%;
                                padding: 9px 12px;
                                background: rgba(124, 120, 120, 0.5);
                                border-radius: 50%;
                                z-index: 999;
                                &:hover {
                                    cursor: pointer;
                                    background: rgba(124, 120, 120, 0.3);
                                }
                            }
                            video {
                                width: 80%;
                            }
                        }
                        .function {
                            display: flex;
                            p {
                                margin-right: 20px;
                                i {
                                    font-size: 20px;
                                    color: #000;
                                    margin-right: 5px;
                                }
                                span {
                                    color: #575454;
                                    &:hover {
                                        cursor: pointer;
                                        color: #000;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>
