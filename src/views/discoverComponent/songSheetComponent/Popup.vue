<!-- 
    弹窗
-->
<template>
    <div class="am-popup">
        <div>{{ name }}</div>
        <ul class="content">
            <li v-for="(categorie, index) in categories" :key="index" class="group">
                <div class="left">
                    <i :class="`iconfont icon ${categorie.icon}`"></i>
                    <!-- <i class="iconfont`${categorie.icon}`"></i> -->
                    <span>{{ categorie.name }}</span>
                </div>
                <ul class="list">
                    <li v-for="(music, key) in musicType[index]" :key="key">{{ music.name }}</li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
    import { getWholeSong } from '@/api/songsheet.js'
    export default {
        name: 'Popup',
        data() {
            return {
                name: '全部歌单',
                all: '', //全部歌单
                musicType: [[], [], [], [], []],
                // musicType: { languages: [], style: [], scene: [], emotion: [], theme: [] },
                categories: [
                    { name: '', icon: 'icon-diqiu' },
                    { name: '', icon: 'icon-gexing' },
                    { name: '', icon: 'icon-kafei' },
                    { name: '', icon: 'icon-tubiaozhizuomoban' },
                    { name: '', icon: 'icon-yinglangshangwufenggetubiao-40' },
                ],
            }
        },
        created() {
            getWholeSong().then(res => {
                this.all = res.data.all
                this.categories.forEach((e, index) => {
                    e.name = res.data.categories[index]
                })
                res.data.sub.forEach((e, index) => {
                    switch (e.category) {
                        case 0:
                            this.musicType[0].push(e)
                            break
                        case 1:
                            this.musicType[1].push(e)
                            break
                        case 2:
                            this.musicType[2].push(e)
                            break
                        case 3:
                            this.musicType[3].push(e)
                            break
                        case 4:
                            this.musicType[4].push(e)
                            break
                    }
                })
                console.log(this.musicType)
            })
        },
    }
</script>

<style lang="less" scoped>
    .am-popup {
        position: absolute;
        top: 30px;
        width: 750px;
        // height: 740px;
        border: 1px solid #e7e1e1;
        box-shadow: 1px -1px rgb(177, 173, 173) inset;
        font-size: 14px;
        padding-left: 20px;
        border-radius: 5px;
        .content {
            padding: 25px;
            .group {
                display: flex;
                align-items: flex-start;
                margin-bottom: 20px;
                .left {
                    color: #949393;
                    font-weight: 100;
                    white-space: nowrap;
                    display: flex;
                    // padding-bottom: 20px;
                    // align-items: center; align-content: flex-start;
                    .icon {
                        font-size: 26px;
                        display: flex;
                        align-items: center;
                    }
                    span {
                        padding: 0;
                        display: flex;
                        // align-items: center;
                    }
                }
                .list {
                    display: flex;
                    margin-left: 50px;
                    flex-wrap: wrap;
                    width: 100%;
                    align-items: center;
                    // background: red;
                    margin-bottom: 25px;
                    li {
                        width: calc(~'100% / 6');
                        margin-bottom: 15px;
                        span:hover {
                            color: rgb(219, 7, 7);
                        }
                    }
                }
            }
        }
    }
</style>
