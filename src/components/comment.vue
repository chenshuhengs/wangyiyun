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
                            <span class="name" @click="userlink(hot)">{{ hot.user.nickname + ':' }}</span>
                            <span class="content">{{ hot.content }}</span>
                            <div v-if="hot.beReplied.length">
                                <span class="nickname">@{{ hot.beReplied[0].user.nickname }}:</span>
                                <span>{{ hot.beReplied[0].content }}</span>
                            </div>
                        </div>
                        <div class="bottom">
                            <div>
                                <span class="time">{{ timeFn(hot.time) }}</span>
                            </div>
                            <div class="top">
                                <i class="iconfont icon-tubiaozhizuo123- red" v-if="hot.liked" @click="fabulousClick(0, hot)">
                                    {{ hot.likedCount }}
                                </i>
                                <i class="iconfont icon-good" v-else @click="fabulousClick(1, hot)">{{ hot.likedCount ? hot.likedCount : '' }}</i>
                                <i class="iconfont icon-xiaoxi" @click="reply(hot, 2)"></i>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </section>
        <section class="lately-comment">
            <h5>最近评论({{ commentCount }})</h5>
            <ul>
                <li v-for="(item, index) in comments" :key="index">
                    <div class="avatar">
                        <img :src="item.user.avatarUrl" alt="" />
                    </div>
                    <div class="comment-content">
                        <div class="content">
                            <span class="name" @click="userlink(hot)">{{ item.user.nickname + ':' }}</span>
                            <span class="content">{{ item.content }}</span>
                            <div v-if="item.beReplied.length">
                                <span class="nickname">@{{ item.beReplied[0].user.nickname }}:</span>
                                <span>{{ item.beReplied[0].content }}</span>
                            </div>
                        </div>
                        <div class="bottom">
                            <div>
                                <span class="time">{{ timeFn(item.time) }}</span>
                            </div>
                            <div class="iconlogo">
                                <el-popconfirm
                                    confirm-button-text="确定"
                                    cancel-button-text="取消"
                                    icon="el-icon-info"
                                    icon-color="red"
                                    title="确定要删除该文章吗?"
                                    @confirm="deleteFn(item, index)"
                                >
                                    <i class="iconfont icon-shanchu1" v-if="deleteComment(item)" slot="reference"></i>
                                </el-popconfirm>

                                <i class="iconfont icon-tubiaozhizuo123- red" v-if="item.liked" @click="fabulousClick(0, item)">
                                    {{ item.likedCount }}
                                </i>
                                <i class="iconfont icon-good" v-else @click="fabulousClick(1, item)">{{ item.likedCount ? item.likedCount : '' }}</i>
                                <i class="iconfont icon-xiaoxi" @click="reply(item, 2)"></i>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </section>
    </section>
</template>

<script>
    import { timeDate } from '@/utils/'
    import storage from 'good-storage'
    import { getComment, getCommentMv, getCommentLike, getCommentDelete } from '@/api/ranking'
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
                limit: 40,
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
            ...loginStore.mapMutations(['USER_ID', 'LOGIN_STATE']),
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
            userlink(item) {
                this.$router.push({
                    path: `/discover/user/${item.user.userId}`,
                })
            },
            xiaolian() {
                this.show = !this.show
            },
            deleteFn(item, index) {
                getCommentDelete({
                    t: 0,
                    type: 1,
                    id: this.mvId,
                    commentId: item.commentId,
                }).then(res => {
                    if (res.data.code == 200) {
                        this.comments.splice(index, 1)
                        this.$message({
                            center: true,
                            showClose: true,
                            message: '删除评论成功',
                            type: 'success',
                        })
                        this.$emit('deleteOk')
                    }
                })
            },
            deleteComment(item) {
                if (storage.get('token')) {
                    let id = storage.get('id')
                    this.USER_ID(id)
                    return id == item.user.userId ? true : false
                } else {
                    this.LOGIN_STATE(true)
                    return false
                }
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
        width: 100%;
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
        .content-list,
        .lately-comment {
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
                                color: rgb(26, 26, 146);
                                &:hover {
                                    .cursor();
                                }
                            }
                            div {
                                display: flex;
                                margin: 10px 0;
                                padding: 5px 5px;
                                background-color: rgba(212, 200, 200, 0.2);
                                border-radius: 5px;
                                .nickname {
                                    color: rgb(26, 26, 146);
                                    &:hover {
                                        .cursor();
                                    }
                                }
                            }
                        }

                        .bottom {
                            display: flex;
                            justify-content: space-between;
                            .top {
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
        }
        .lately-comment {
            margin-top: 50px;
            h5 {
                font-size: 16px;
                font-weight: 600;
            }
            .iconlogo {
                width: 15%;
                i {
                    display: inline-block;
                    width: 30%;
                    text-align: center;
                    white-space: nowrap;
                }
            }
        }
    }
</style>
