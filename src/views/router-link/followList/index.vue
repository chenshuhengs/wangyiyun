<!-- 
    关注列表
-->
<template>
    <section class="follow">123123</section>
</template>

<script>
    import { getUserFollow } from '@/api/user'
    export default {
        name: 'followList',
        data() {
            return {
                userId: '',
            }
        },
        created() {
            this.userId = this.$route.params.id
            this.userName = this.$route.query
            console.log(this.userName)
            getUserFollow({ id: this.userId }).then(res => {
                console.log(res)
            })
        },
    }
</script>

<style lang="less" scoped></style>
