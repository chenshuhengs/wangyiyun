<!-- 
    弹窗
-->
<template>
    <div class="am-popup">
        <div class="top">
            <span class="hover" @click="cutTabClick('全部')" :class="[activeLable == '全部' ? 'active1' : '']">全部音乐</span>
        </div>
        <ul class="list">
            <li v-for="(type, index) in musicList" :key="index" class="content">
                <div class="left">
                    <i :class="`iconfont ${type.icon}`"></i>
                    <span>{{ type.type }}</span>
                </div>
                <ul class="right">
                    <li v-for="(music, key) in type.list" :key="key">
                        <span class="hover" :class="[activeLable == music.name ? 'active2' : '']" @click="cutTabClick(music)">
                            {{ music.name }}
                            <i v-if="music.hot" class="red">HOT</i>
                        </span>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
    import Bus from '@/utils/bus.js'
    import { createNamespacedHelpers } from 'vuex'
    import { getWholeSong } from '@/api/songsheet.js'
    const discoverStore = createNamespacedHelpers('discoverStore')
    export default {
        name: 'Popup',
        data() {
            return {
                name: '全部歌单',
                all: '', //全部歌单
                musicList: [
                    { icon: 'icon-diqiu', type: '', list: [] },
                    { icon: 'icon-gexing', type: '', list: [] },
                    { icon: 'icon-kafei', type: '', list: [] },
                    { icon: 'icon-tubiaozhizuomoban', type: '', list: [] },
                    { icon: 'icon-yinglangshangwufenggetubiao-40', type: '', list: [] },
                ],
            }
        },
        created() {
            getWholeSong().then(res => {
                this.all = res.data.all
                this.musicList.forEach((e, index) => {
                    e.type = res.data.categories[index]
                })
                res.data.sub.forEach((e, index) => {
                    switch (e.category) {
                        case 0:
                            this.musicList[0].list.push(e)
                            break
                        case 1:
                            this.musicList[1].list.push(e)
                            break
                        case 2:
                            this.musicList[2].list.push(e)
                            break
                        case 3:
                            this.musicList[3].list.push(e)
                            break
                        case 4:
                            this.musicList[4].list.push(e)
                            break
                    }
                })
            })
        },
        methods: {
            ...discoverStore.mapMutations(['ACIVE_LABLE', 'POP_UP_CLOST']),
            ...discoverStore.mapActions({
                getBoutiqueSong: 'getBoutiqueSong',
            }),
            cutTabClick(only) {
                if (only == '全部') {
                    this.ACIVE_LABLE('全部')
                } else {
                    this.ACIVE_LABLE(only.name)
                }
                Bus.$emit('contentList', this.activeLable)
                this.getBoutiqueSong()
                this.POP_UP_CLOST(false)
            },
        },
        computed: {
            ...discoverStore.mapState(['activeLable']),
        },
        beforeDestroy() {
            this.POP_UP_CLOST(false)
        },
    }
</script>

<style lang="less" scoped>
    @import '../../../assets/style/mixins.less';
    .am-popup {
        z-index: 999;
        position: absolute;
        top: 40px;
        width: 950px;
        height: 850px;
        font-size: 18px;
        border-radius: 5px;
        border: 1px solid #e7e1e1;
        box-shadow: 1px -1px rgb(177, 173, 173) inset;
        background: #fff;
        .top {
            height: 60px;
            display: flex;
            align-items: center;
            padding-left: 40px;
            border-bottom: 1px solid #e0e0e0;
        }
        .list {
            .content {
                display: flex;
                align-items: flex-start;
                padding: 20px 0;
                .left {
                    width: 150px;
                    display: flex;
                    color: #a8a3a3;
                    font-weight: 100;
                    align-items: center;
                    justify-content: center;
                    i {
                        font-size: 28px;
                    }
                }
                .right {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    flex-wrap: wrap;
                    li {
                        width: calc(~'100% / 6');
                        margin-top: 5px;
                        padding-bottom: 15px;
                        position: relative;
                        span {
                            padding: 4px 15px;
                            position: relative;
                            // display: inline-block;
                        }
                        .red {
                            position: absolute;
                            top: 3px;
                            right: -8px;
                            font-size: 0.052083rem;
                            color: rgb(226, 25, 25);
                        }
                    }
                }
            }
        }
        .hover:hover {
            .hover(rgb(226, 25, 25));
        }
        .active1 {
            color: rgb(226, 25, 25);
            padding: 4px 10px;
            border-radius: 30px;
            background: rgba(243, 147, 163, 0.3);
        }
        .active2 {
            color: rgb(226, 25, 25);
            border-radius: 30px;
            background: rgba(226, 145, 159, 0.3);
        }
    }
</style>
