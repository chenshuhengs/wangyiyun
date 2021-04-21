<template>
    <section class="login">
        <div class="content">
            <h3>登录</h3>
            <el-form :label-position="labelPosition" label-width="100px" :model="form">
                <el-form-item label="用户名:">
                    <el-input v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item label="密码:">
                    <el-input v-model="form.password" type="password"></el-input>
                </el-form-item>
            </el-form>
            <el-button :plain="show" type="primary" @click="loginStart">登录</el-button>
        </div>
        <div class="close" @mouseover="rotate" @click="close" :class="[count == 1 ? 'yes' : 'no']">
            <Icon :size="12" name="guanbi"></Icon>
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
                count: 0,
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
            rotate() {
                this.count++
            },
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
    .login {
        padding: 20px 30px;
        z-index: 999;
        position: absolute;
        left: 40%;
        top: 30%;
        background: #fff;
        width: 250px;
        height: 330px;
        border-radius: 10px;
        .content {
            display: flex;
            flex-direction: column;
            text-align: center;
            .el-button {
                margin-top: 40px;
            }
        }
        .close {
            position: absolute;
            right: 10px;
            top: 10px;
        }
        .yes {
            &:hover {
                animation: 0.3s fadeIn forwards;
            }
            @keyframes fadeIn {
                0% {
                    transform: rotate(0deg);
                }
                100% {
                    transform: rotate(180deg);
                }
            }
        }
    }
</style>
