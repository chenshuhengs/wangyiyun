<template>
    <section class="heart">
        <i class="iconfont icon-bqxin like" v-if="likeMusicFn" @click="chooseMusic(false)"></i>
        <i class="iconfont icon-xin1" v-else @click="chooseMusic(true)"></i>
    </section>
</template>

<script>
    import storage from 'good-storage'
    import { likeMusic } from '@/utils/'
    import { createNamespacedHelpers } from 'vuex'
    const loginStore = createNamespacedHelpers('loginStore')
    export default {
        name: 'heart',
        props: {
            item: {
                type: Object,
            },
        },
        data() {
            return {
                likeMusicid: '',
            }
        },
        created() {
            if (storage.get('token')) {
                let id = storage.get('id')
                this.USER_ID(id)
                this.getLikeListFn(id).then(res => {
                    if (res.code) {
                        this.likeMusicid = res.ids
                    }
                })
            } else {
                this.LOGIN_STATE(false)
            }
        },
        computed: {
            likeMusicFn() {
                if (storage.get('token')) {
                    // 完成深拷贝
                    if (Array.isArray(this.likeMusicid)) {
                        return likeMusic(this.item.id, this.likeMusicid.slice(0))
                    }
                }
                return false
            },
        },
        methods: {
            ...loginStore.mapMutations(['USER_ID', 'LOGIN_STATE']),
            ...loginStore.mapActions(['getLikeListFn', 'chooseMusicFn']),
            chooseMusic(bool) {
                if (storage.get('token')) {
                    let uid = storage.get('id')
                    this.chooseMusicFn({ id: this.item.id, like: bool }).then(res => {
                        if (res.data.code == 200) {
                            if (bool) {
                                this.likeMusicid.push(this.item.id)
                            } else {
                                this.likeMusicid.forEach((e, index) => (e == this.item.id ? this.likeMusicid.splice(index, 1) : ''))
                            }
                        }
                    })
                } else {
                    this.LOGIN_STATE(true)
                }
            },
        },
    }
</script>

<style lang="less" scoped>
    .heart {
        .like {
            color: rgb(216, 24, 24);
        }
    }
</style>
