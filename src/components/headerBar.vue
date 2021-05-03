<template>
    <section class="header">
        <div class="left">
            <div @click="homepage" class="operation red"><Icon :size="9" name="zhuye"></Icon></div>
            <div @click="narrow" class="operation yellow"><Icon :size="9" name="suoxiao"></Icon></div>
            <div @click="enlarge" class="operation green"><Icon :size="9" name="icon--"></Icon></div>
        </div>
        <div class="right">
            <div class="login" @click="login" v-if="show">登录</div>
            <div class="user" v-else>
                <img :src="avatar" alt="" />
                <span @click="showpopup">{{ name }}</span>
                <transition name="fade">
                    <userPopup v-if="popup" :id="id"></userPopup>
                </transition>
            </div>
            <div class="portrait"></div>
            <div class="search-wrap"><search></search></div>
            <Theme></Theme>
        </div>
    </section>
</template>

<script>
    import Bus from '@/utils/bus'
    import storage from 'good-storage'
    import Theme from '@/private/theme'
    import search from '@/private/search'
    import userPopup from '@/private/userPopup/userPopup'
    import { createNamespacedHelpers } from 'vuex'
    const loginStore = createNamespacedHelpers('loginStore')
    const playMusicStore = createNamespacedHelpers('playMusicStore')
    import { requestFullScreen, exitFullscreen, isFullscreen } from '@/utils/pageScaling.js'
    export default {
        name: 'headerBar',
        data() {
            return {
                id: '',
                show: true,
                Popupstate: false,
            }
        },
        components: { Theme, search, userPopup },
        created() {
            this.id = storage.get('id')
            let name = storage.get('name')
            let avatar = storage.get('avatar')
            this.USER_NAME(name)
            this.USER_AVATAR(avatar)
            name && avatar ? (this.show = false) : (this.show = true)
            Bus.$on('loginOk', () => {
                this.id = storage.get('id')
                let name = storage.get('name')
                let avatar = storage.get('avatar')
                this.USER_NAME(name)
                this.USER_AVATAR(avatar)
                name && avatar ? (this.show = false) : (this.show = true)
            })
        },
        methods: {
            ...playMusicStore.mapMutations(['MUSIC_PAGE_STATE']),
            ...loginStore.mapMutations(['POPUP', 'USER_NAME', 'USER_AVATAR', 'LOGIN_STATE']),
            login() {
                this.LOGIN_STATE(true)
            },
            // 缩小
            narrow() {
                if (isFullscreen()) {
                    exitFullscreen()
                }
            },
            // 放大
            enlarge() {
                requestFullScreen()
            },
            // 回到主页
            homepage() {
                this.$router.push('/')
                this.MUSIC_PAGE_STATE(false)
            },
            showpopup() {
                this.Popupstate = !this.Popupstate
                this.POPUP(this.Popupstate)
            },
        },
        computed: {
            ...loginStore.mapState(['name', 'popup', 'avatar', 'loginState']),
        },
    }
</script>

<style lang="less" scoped>
    @import '../assets/style/mixins.less';
    @import '../assets/style/variable.less';
    .header {
        position: relative;
        background-color: var(--header-bgcolor);
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 50px;
        height: 50px;
        .left {
            display: flex;
            line-height: 2.604167rem;
            .operation {
                .round(20px);
                .flex-center;
                margin-right: 8px;
                &.red {
                    background: #ed655a;
                }

                &.green {
                    background: #72be47;
                }

                &.yellow {
                    background: #e0c04c;
                }
                &:hover {
                    i {
                        opacity: 1;
                    }
                }
                i {
                    opacity: 0;
                    transition: opacity 0.3s;
                    color: @black;
                    font-weight: @font-weight-bold;
                }
            }
        }
        .right {
            display: flex;
            align-items: center;
            color: var(--font-color);
            .login {
                font-size: 20px;
                color: #6b6868;
                margin-right: 30px;
                &:hover {
                    color: #000;
                    .cursor();
                }
            }
            .user {
                width: 150px;
                display: flex;
                position: relative;
                margin-right: 30px;
                align-items: center;
                white-space: nowrap;
                img {
                    width: 35px;
                    height: 35px;
                    margin-right: 5px;
                    border-radius: 50%;
                }
                span {
                    .line();
                    font-size: 16px;
                    color: #6b6868;
                    &:hover {
                        color: #000;
                        .cursor();
                    }
                }
            }
            .search-wrap {
                margin-right: 16px;
            }
        }
    }
</style>
