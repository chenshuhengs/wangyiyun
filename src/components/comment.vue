<!-- 
    评论组件
-->
<template>
    <section class="comment">
        <p>
            评论
            <span>({{ commentCount }})</span>
        </p>
        <div class="text">
            <textarea id="input" maxlength="140" @input="input" v-model="inputvalue"></textarea>
            <p class="warning">{{ length }}</p>
        </div>
        <div class="submit">
            <div class="xiaolian">
                <i class="iconfont icon-xiaolian1" @click="xiaolian"></i>
                <div>
                    <VEmojiPicker @select="selectEmoji" v-if="show" />
                </div>
            </div>
            <el-button round @click="commentSubmit">评论</el-button>
        </div>
        <section class="content-list">
            <h5>精彩评论</h5>
            <ul>
                <li v-for="(hot, index) in hotComments" :key="index">
                    <div class="avatar">
                        <img :src="hot.user.avatarUrl" alt="" />
                    </div>
                    <div class="comment-content">
                        <div class="content">
                            <span class="name">{{ hot.user.nickname + ':' }}</span>
                            <span class="content">{{ hot.content }}</span>
                        </div>
                        <div class="bottom">
                            <div>
                                <span class="time">{{ timeFn(hot.time) }}</span>
                            </div>
                            <div>
                                <i class="iconfont icon-tubiaozhizuo123- red" v-if="hot.liked" @click="fabulousClick(0, hot)"></i>
                                <i class="iconfont icon-good" v-else @click="fabulousClick(1, hot)"></i>
                                <i class="iconfont icon-xiaoxi" @click="reply(hot, 2)"></i>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </section>
        <section class="lately-comment">
            <h5>最近评论({{ commentCount }})</h5>
        </section>
    </section>
</template>

<script>
    import { timeDate } from '@/utils/'
    import storage from 'good-storage'
    import { getComment, getCommentMv, getCommentLike } from '@/api/ranking'
    import { createNamespacedHelpers } from 'vuex'
    const loginStore = createNamespacedHelpers('loginStore')
    export default {
        name: 'comment',
        props: {
            mvId: {
                type: String,
            },
            commentCount: {
                type: Number,
            },
        },
        data() {
            return {
                show: false,
                length: 140,
                comments: [],
                commentId: '', //当前文章的id
                inputvalue: '',
                hotComments: [],
                replyComment: '',
                commentState: 1, //评论状态 ： 1：发表评论  2：回复评论
            }
        },
        created() {
            getCommentMv({ id: this.mvId }).then(res => {
                res.data.code == 200 ? ((this.hotComments = res.data.hotComments), (this.comments = res.data.comments)) : ''
            })
        },
        watch: {
            inputvalue(a, b) {
                if (this.replyComment) {
                    if (a.slice(0, this.replyComment.length) === this.replyComment) {
                        this.commentState = 2
                    } else {
                        this.commentState = 1
                        this.replyComment = ''
                    }
                }
                if (a.length > b.length) {
                    let num = a.length - b.length
                    this.length -= num
                } else if (a.length < b.length) {
                    let num = b.length - a.length
                    this.length += num
                }
            },
        },
        methods: {
            ...loginStore.mapMutations(['LOGIN_STATE']),
            input() {
                if (this.inputvalue.length >= 140) {
                    this.$message({
                        message: '字体数最多为 140 字符',
                        type: 'warning',
                    })
                }
            },
            reply(hot, key) {
                this.commentId = hot.commentId
                this.inputvalue = ''
                let input = document.getElementById('input')
                this.replyComment = '回复' + hot.user.nickname + ':'
                this.inputvalue = '回复' + hot.user.nickname + ':'
                input.focus()
            },
            timeFn(time) {
                return timeDate(time)
            },
            xiaolian() {
                this.show = !this.show
            },
            selectEmoji(emoji) {
                let input = document.getElementById('input')
                let startPos = input.selectionStart
                let endPos = input.selectionEnd
                let resultText = input.value.substring(0, startPos) + emoji.data + input.value.substring(endPos)
                input.value = resultText
                input.focus()
                input.selectionStart = startPos + emoji.data.length
                input.selectionEnd = startPos + emoji.data.length
                this.inputvalue = resultText
            },
            fabulousClick(t, hot) {
                getCommentLike({
                    id: this.mvId,
                    cid: hot.commentId,
                    t: t,
                    type: 1,
                }).then(res => {
                    if (res.data.code == 200 && t == 0) {
                        this.$message({
                            center: true,
                            showClose: true,
                            message: '取消点赞',
                            type: 'success',
                        })
                        return this.hotComments
                    } else if (res.data.code == 200 && t == 1) {
                        this.$message({
                            center: true,
                            showClose: true,
                            message: '点赞成功',
                            type: 'success',
                        })
                    }
                })
            },
            commentSubmit() {
                if (storage.get('token')) {
                    if (this.inputvalue) {
                        if (this.inputvalue.length == this.replyComment.length) {
                            this.$message({
                                message: '写点消息把  内容不能为空哦',
                                center: true,
                                type: 'warning',
                            })
                        } else {
                            getComment({
                                t: this.commentState,
                                type: 1,
                                id: this.mvId,
                                content:
                                    this.commentState == 2
                                        ? this.inputvalue.slice(this.replyComment.length, this.inputvalue.length)
                                        : this.inputvalue,
                                commentId: this.commentId ? this.commentId : '',
                            }).then(res => {
                                if (res.data.code == 200) {
                                    this.$message({
                                        center: true,
                                        showClose: true,
                                        message: '发表评论 成功',
                                        type: 'success',
                                    })
                                }
                                this.$emit('commentOk')
                            })
                        }
                    } else {
                        this.$message({
                            message: '写点消息把  内容不能为空哦',
                            center: true,
                            type: 'warning',
                        })
                    }
                } else {
                    this.LOGIN_STATE(true)
                }
            },
        },
    }
</script>

<style lang="less" scoped>
    @import '../assets/style/mixins.less';
    .comment {
        width: 60%;
        p {
            font-weight: 700;
            margin: 20px 0;
            font-size: 20px;
            span {
                font-weight: 200;
                font-size: 18px;
            }
        }
        .text {
            position: relative;
            textarea {
                border-color: #e0e0e0;
                resize: none;
                height: 100px;
                width: 100%;
                border-radius: 10px;
                font-size: 20px;
                padding: 5px;
                outline: none;
            }
            .warning {
                position: absolute;
                right: 5px;
                bottom: -15px;
                font-size: 18px;
                color: #4d4a4a;
                font-weight: 400;
                letter-spacing: 3px;
            }
        }
        .submit {
            display: flex;
            justify-content: space-between;
            .xiaolian {
                position: relative;
                i {
                    font-size: 28px;
                }
                div {
                    position: absolute;
                }
            }
        }
        .content-list {
            h5 {
                font-size: 16px;
                font-weight: 600;
            }
            ul {
                li {
                    display: flex;
                    padding: 10px 0 10px 10px;
                    height: 100px;
                    border-bottom: 1px solid #e9e2e2;
                    .avatar {
                        width: 50px;
                        margin-right: 10px;
                        img {
                            width: 100%;
                            border: 1px solid #e0e0e0;
                            border-radius: 50%;
                        }
                    }
                    .comment-content {
                        width: 100%;
                        display: flex;
                        flex-direction: column;
                        .content {
                            height: 80px;
                            .name {
                                color: rgb(29, 29, 209);
                                &:hover {
                                    .cursor();
                                }
                            }
                        }

                        .bottom {
                            display: flex;
                            justify-content: space-between;
                            i {
                                margin-left: 20px;
                            }
                            .red {
                                color: red;
                            }
                        }
                    }
                }
            }
        }
        .lately-comment {
            h5 {
                font-size: 16px;
                font-weight: 600;
            }
        }
    }
</style>
