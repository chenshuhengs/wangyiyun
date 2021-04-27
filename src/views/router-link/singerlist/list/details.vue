<!-- 
    歌手详情
-->
<template>
    <section class="details">
        <div class="content">
            <span>{{ briefDesc }}</span>
        </div>
    </section>
</template>

<script>
    import { getAlbumDetail } from '@/api/singer'
    export default {
        name: 'detailsCom',
        props: {
            singerId: {
                type: String,
            },
        },
        data() {
            return {
                briefDesc: '',
            }
        },
        created() {
            getAlbumDetail({ id: this.singerId }).then(res => {
                this.briefDesc = res.data.data.artist.briefDesc
            })
        },
    }
</script>

<style lang="less" scoped>
    .details {
        .content {
            span {
                line-height: 30px;
            }
        }
    }
</style>
