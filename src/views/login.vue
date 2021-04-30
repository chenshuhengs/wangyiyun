<template>
    <section class="am-login">
        <div id="bigBox">
            <h1>LOGIN</h1>
            <div class="inputBox">
                <div class="inputText">
                    <span class="iconfont icon-nickname"></span>
                    <input type="text" v-model="form.username" placeholder="Username" />
                </div>
                <div class="inputText">
                    <span class="iconfont icon-visible_outlined"></span>
                    <input type="password" v-model="form.password" placeholder="Password" />
                </div>
            </div>
            <input class="loginButton" type="button" value="Login" @click="loginStart" />
            <i class="iconfont icon-guanbi guanbi" @click="close"></i>
        </div>
    </section>
</template>

<script>
    import Bus from '@/utils/bus'
    import storage from 'good-storage'
    import { login } from '@/api/login'
    import { createNamespacedHelpers } from 'vuex'
    const loginStore = createNamespacedHelpers('loginStore')
    export default {
        name: 'Login',
        data() {
            return {
                show: false,
                form: {
                    username: '',
                    password: '',
                },
                labelPosition: 'left',
            }
        },
        methods: {
            ...loginStore.mapMutations(['USER_ID', 'USER_NAME', 'USER_AVATAR', 'LOGIN_STATE']),
            close() {
                this.LOGIN_STATE(false)
            },
            loginStart() {
                if (!this.form.username || !this.form.password) {
                    this.show = true
                    this.$message.error('用户名或密码不能为空')
                    return
                } else {
                    login({
                        phone: this.form.username,
                        password: this.form.password,
                    }).then(res => {
                        if (res.data.code == 200) {
                            this.$message({
                                message: '登录成功',
                                type: 'success',
                            })
                            storage.set('id', res.data.account.id)
                            storage.set('token', res.data.token)
                            storage.set('name', res.data.profile.nickname)
                            storage.set('avatar', res.data.profile.avatarUrl)
                            this.USER_ID(res.data.account.id)
                            this.USER_NAME(res.data.profile.nickname)
                            this.USER_AVATAR(res.data.profile.avatarUrl)
                            this.LOGIN_STATE(false)
                            Bus.$emit('loginOk')
                            Bus.$emit('loginYes')
                        } else {
                            this.$message.error('登录失败，请重新登录')
                        }
                    })
                }
            },
        },
    }
</script>

<style lang="less" scoped>
    .am-login {
        z-index: 999;
        position: absolute;
        left: 40%;
        top: 30%;
        border-radius: 10px;
        #bigBox {
            position: relative;
            padding: 20px 50px; /* login框内部的距离(内部与输入框和按钮的距离) */
            background-color: rgba(48, 46, 46, 0.7); /* login框背景颜色和透明度 */
            width: 400px;
            height: 360px;
            border-radius: 10px; /* 圆角边 */
            text-align: center; /* 框内所有内容剧中 */
        }

        #bigBox h1 {
            color: white; /* LOGIN字体颜色 */
        }

        #bigBox .inputBox {
            margin-top: 50px; /* 输入框顶部与LOGIN标题的间距 */
        }

        #bigBox .inputBox .inputText {
            margin-top: 20px; /* 输入框之间的距离 */
        }

        #bigBox .inputBox .inputText span {
            color: white; /* icon颜色 */
        }

        #bigBox .inputBox .inputText input {
            border: 0; /* 删除输入框边框 */
            padding: 10px 10px; /* 输入框内的间距 */
            border-bottom: 1px solid white; /* 输入框白色下划线 */
            background-color: #00000000; /* 输入框透明 */
            color: white; /* 输入字体的颜色 */
        }

        #bigBox .loginButton {
            margin-top: 30px; /* 按钮顶部与输入框的距离 */
            width: 150px;
            height: 40px;
            color: white; /* 按钮字体颜色 */
            border: 0; /* 删除按钮边框 */
            border-radius: 20px; /* 按钮圆角边 */
            background-image: linear-gradient(to right, #b8cbb8 0%, #b8cbb8 0%, #b465da 0%, #cf6cc9 33%, #ee609c 66%, #b18798 100%); /* 按钮颜色 */
        }
        .guanbi {
            position: absolute;
            right: 10px;
            top: 10px;
            font-size: 20px;
            color: #fff;
            &:hover {
                cursor: pointer;
            }
        }
    }
</style>
