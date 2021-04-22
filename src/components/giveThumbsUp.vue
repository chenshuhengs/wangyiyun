<!-- 
    点赞组件
-->
<template>
    <section>
        <div>
            <i class="iconfont icon-tubiaozhizuo123- red" v-if="fabulousFn" @click="praiseMv(0)"></i>
            <i class="iconfont icon-good" v-else @click="praiseMv(1)"></i>
            <span v-if="fabulousFn" @click="praiseMv(0)">已赞({{ likedCountv }})</span>
            <span v-else @click="praiseMv(1)">点赞({{ likedCountv }})</span>
        </div>
    </section>
</template>

<script>
    import { fabulous } from '@/utils/'
    import { getPlaylistMylike, getResourceLike } from '@/api/ranking'
    export default {
        name: 'giveThumbsUp',
        props: {
            mvId: {
                type: String,
            },
            likedCountv: {
                type: Number,
            },
        },
        data() {
            return {
                feeds: [],
            }
        },
        created() {
            getPlaylistMylike().then(res => {
                this.feeds = res.data.data.feeds
            })
        },
        computed: {
            fabulousFn() {
                if (Array.isArray(this.feeds)) {
                    return fabulous(this.mvId, this.feeds)
                }
                return false
            },
        },
        methods: {
            praiseMv(t) {
                getResourceLike({
                    t: t,
                    type: 1,
                    id: this.mvId,
                }).then(res => {
                    if (res.data.code == 200 && t == 0) {
                        console.log(this.feeds)
                        this.feeds.forEach((e, index) => (e.mlogBaseData.id == this.mvId ? this.feeds.splice(index, 1) : ''))
                        this.$message({
                            showClose: true,
                            message: '取消点赞 成功',
                            type: 'success',
                        })
                        this.$emit('clickOk', 0)
                    } else if (res.data.code == 200 && t == 1) {
                        this.feeds.push({ mlogBaseData: { id: this.mvId } })
                        this.$message({
                            showClose: true,
                            message: '点赞 成功',
                            type: 'success',
                        })
                        this.$emit('clickOk', 1)
                    }
                })
            },
        },
    }
</script>

<style lang="less" scoped>
    @import '../assets/style/mixins.less';
    section {
        margin: 20px 20px 20px 0;
        div {
            border: 1px solid #e0e0e0;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 5px 10px;
            border-radius: 30px;
            white-space: nowrap;
            &:hover {
                .cursor();
                background-color: rgba(184, 177, 177, 0.3);
            }
            i {
                font-size: 20px;
                margin-right: 10px;
            }
            .red {
                color: red;
            }
            span {
                font-size: 18px;
            }
        }
    }
</style>
