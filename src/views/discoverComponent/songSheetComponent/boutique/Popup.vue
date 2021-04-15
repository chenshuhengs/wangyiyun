<!-- 
    弹窗
-->
<template>
    <section class="popup">
        <div class="top">
            <span @click="tagname()">全部歌单</span>
        </div>
        <ul class="content">
            <li v-for="(tag, index) in tags" :key="index">
                <span @click="tagname(tag.name)" :class="[tag.name == name ? 'active' : '']">{{ tag.name }}</span>
            </li>
        </ul>
    </section>
</template>

<script>
    import { createNamespacedHelpers } from 'vuex'
    const discoverStore = createNamespacedHelpers('discoverStore')
    export default {
        name: 'Popup',
        props: {
            tagnameId: {
                type: String,
                default: '全部',
            },
        },
        data() {
            return {
                tags: [],
                playlists: [],
                name: this.tagnameId,
            }
        },
        created() {
            this.getTagListFu().then(res => {
                this.tags = res.tags
            })
            // this.getBoutiqueSong({
            //     limit: 20,
            //     cat: name ? name : '全部',
            // }).then(res => {
            //     this.$emit('playlistFn', res.data.playlists, name ? name : '全部')
            // })
        },
        computed: {},
        methods: {
            ...discoverStore.mapActions(['getTagListFu', 'getBoutiqueSong']),
            tagname(name) {
                this.getBoutiqueSong({
                    limit: 20,
                    cat: name ? name : '全部',
                }).then(res => {
                    this.$emit('playlistFn', res.data.playlists, name ? name : '全部')
                })
            },
        },
    }
</script>

<style lang="less" scoped>
    @import '../../../../assets/style/mixins.less';
    .popup {
        width: 700px;
        z-index: 999;
        font-size: 14px;
        border-radius: 5px;
        background: #fff;
        .position1(0px,40px);
        border: 1px solid #e7e1e1;
        box-shadow: 1px -1px rgb(177, 173, 173) inset;
        .top {
            padding: 30px 0 30px 30px;
            border-bottom: 1px solid #e0e0e0;
        }
        .content {
            width: 100%;
            padding: 30px;
            display: flex;
            flex-wrap: wrap;
            li {
                display: flex;
                margin-bottom: 37px;
                white-space: nowrap;
                width: calc(~'100% / 5');
            }
        }
        span {
            border-radius: 30px;
            padding: 3px 10px;
            &:hover {
                .cursor();
                color: rgb(226, 21, 21);
            }
        }
        .active {
            background-color: rgba(224, 162, 173, 0.3);
            color: rgb(226, 21, 21);
        }
    }
</style>
