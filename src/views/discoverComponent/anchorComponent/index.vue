<!-- 
    主播电台
-->
<template>
    <section class="anchor">
        <Banner :bannerList="banner"></Banner>
    </section>
</template>

<script>
    import { getRecommendBanner } from '@/api/banner'
    export default {
        name: 'anchorComponent',
        data() {
            return {
                banner: [],
            }
        },
        created() {
            getRecommendBanner().then(res => {
                this.banner = res.data.data
            })
        },
    }
</script>

<style lang="less" scoped></style>
