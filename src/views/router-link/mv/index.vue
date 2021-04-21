<template>
    <section class="mv">
        <div class="left">
            <h5 @click="callback">
                <Icon :size="12" name="arrow-left-bold"></Icon>
                <span>MV详情</span>
            </h5>
            <div class="video">
                <video controls autoplay :src="mvUrl">您的浏览器不支持 video 标签。</video>
            </div>
            <div class="introduce">
                <div class="top">
                    <p v-if="this.singer.data">
                        <img :src="this.singer.data.artists[0].img1v1Url" alt="" />
                    </p>
                    <!--  -->
                    <div v-if="this.singer.data">
                        <p v-for="(value, key) in singer.data.artists" :key="key">
                            <span v-if="singer.data.artists.length == 1">{{ value.name }}</span>
                            <span v-else>{{ singer.data.artists.length == key + 1 ? value.name : value.name + '/' }}</span>
                        </p>
                    </div>
                </div>
                <div class="title">
                    <div v-if="singer.data">
                        <p>{{ singer.data.name }}</p>
                    </div>
                    <p v-if="singer.data">{{ singer.data.publishTime }}</p>
                </div>
            </div>
        </div>
        <div class="right"></div>
    </section>
</template>

<script>
    import { getMvAddress, getMvdetail } from '@/api/ranking'
    export default {
        name: 'mv',
        data() {
            return {
                mv: '',
                mvUrl: '',
                singer: '',
                show: false,
            }
        },
        created() {
            this.mv = this.$route.params.id
            getMvAddress(this.mv).then(res => {
                this.mvUrl = res.data.data.url
            })
            getMvdetail(this.mv).then(res => {
                this.singer = res.data
                console.log(this.singer)
            })
        },
        methods: {
            callback() {
                this.$router.go(-1)
            },
        },
    }
</script>

<style lang="less" scoped>
    @import '../../../assets/style/mixins.less';
    .mv {
        display: flex;
        padding: 0 30px;
        width: 100%;
        h5 {
            height: 80px;
            display: flex;
            align-items: center;
            margin: 0;
            span {
                font-size: 18px;
                margin-left: 15px;
                &:hover {
                    .cursor();
                }
            }
        }
        .video {
            width: 60%;
            video {
                width: 100%;
            }
        }
        .introduce {
            // display: flex;
            .top {
                display: flex;
                align-items: center;
                font-size: 18px;
                font-weight: 200;
                div {
                    display: flex;
                }
                img {
                    width: 50px;
                    height: 50px;
                    margin-right: 20px;
                    border-radius: 50%;
                }
            }
            .title {
                margin-top: 20px;
                font-weight: 700;
                letter-spacing: 3px;
            }
        }
    }
</style>
