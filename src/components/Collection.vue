<!-- 
    收藏组件
-->
<template>
    <section class="collection">
        <div>
            <i class="iconfont icon-shoucang1 red" v-if="queryCollectionFn" @click="changeCollectionState(0)"></i>
            <i class="iconfont icon-shoucang" v-else @click="changeCollectionState(1)"></i>
            <span v-if="queryCollectionFn" @click="changeCollectionState(0)">已收藏{{ subCount }}</span>
            <span v-else @click="changeCollectionState(1)">收藏{{ subCount }}</span>
        </div>
    </section>
</template>

<script>
    import { queryCollection } from '@/utils/'
    import { getMvSub, getMvSublist } from '@/api/ranking'
    export default {
        name: 'Collection',
        props: {
            mvId: {
                type: String,
            },
            subCount: {
                type: Number,
            },
        },
        data() {
            return {
                Collection: [],
            }
        },
        created() {
            getMvSublist().then(res => {
                this.Collection = res.data.data
            })
        },
        computed: {
            queryCollectionFn() {
                return queryCollection(this.mvId, this.Collection)
            },
        },
        methods: {
            changeCollectionState(key) {
                getMvSub({
                    id: this.mvId,
                    t: key,
                }).then(res => {
                    if (res.data.code == 200 && key == 0) {
                        this.Collection.forEach((e, index) => (e.vid == this.mvId ? this.Collection.splice(index, 1) : ''))
                        this.$message({
                            showClose: true,
                            message: res.data.message,
                            type: 'success',
                        })
                    } else if (res.data.code == 200 && key == 1) {
                        this.Collection.push({ vid: this.mvId })
                        this.$message({
                            showClose: true,
                            message: res.data.message,
                            type: 'success',
                        })
                    }
                })
            },
        },
    }
</script>

<style lang="less" scoped>
    @import '../assets/style/mixins.less';
    .collection {
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
