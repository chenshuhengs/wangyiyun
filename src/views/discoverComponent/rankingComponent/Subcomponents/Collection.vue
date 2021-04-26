<!-- 
    收藏者
-->
<template>
    <section class="collection">
        <followPeople :followList="followList"></followPeople>
        <paging :total="total" :size="size" @pageJump="pageJump"></paging>
    </section>
</template>

<script>
    import followPeople from '@/private/followPeople'
    import { getPlaylistSubscribers } from '@/api/songsheet'
    export default {
        name: 'Collection',
        props: {
            id: {
                type: String,
            },
        },
        components: {
            followPeople,
        },
        data() {
            return {
                size: 30,
                total: 0,
                followList: [],
            }
        },
        created() {
            getPlaylistSubscribers({ limit: this.size, id: this.id }).then(res => {
                this.total = res.data.total
                if (res.data.more) {
                    this.followList = res.data.subscribers
                }
            })
        },
        methods: {
            pageJump(page) {
                getPlaylistSubscribers({ limit: this.size, id: this.id, offset: (page - 1) * this.size }).then(res => {
                    this.total = res.data.total
                    if (res.data.more) {
                        this.followList = res.data.subscribers
                    }
                })
            },
        },
    }
</script>

<style lang="less" scoped></style>
