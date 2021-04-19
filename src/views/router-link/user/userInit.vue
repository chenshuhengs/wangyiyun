<!-- 
    用户的子路由
-->
<template>
    <div>123123</div>
</template>

<script>
    import { createNamespacedHelpers } from 'vuex'
    const loginStore = createNamespacedHelpers('loginStore')
    // import { getFans, getFollow, getUserdynamic } from '@/api/login'
    export default {
        name: 'userInit',
        data() {
            return {
                id: '',
                key: '',
            }
        },
        created() {
            this.id = this.$route.query.uid
            this.key = this.$route.params.key
            if (this.key == 1) {
                this.getUserdynamicFn(this.id).then(res => {})
            } else if (this.key == 2) {
                this.getFollowFn(this.id)
            } else if (this.key == 3) {
                this.getFansFn(this.id)
            }
        },
        methods: {
            ...loginStore.mapActions(['getFansFn', 'getFollowFn', 'getUserdynamicFn']),
        },
    }
</script>

<style lang="less" scoped></style>
