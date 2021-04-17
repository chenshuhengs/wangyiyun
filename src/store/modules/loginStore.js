// 登录按钮

const state = {
    loginState: false,
}
const getters = {}
const mutations = {
    LOGIN_STATE(state, bool) {
        state.loginState = bool
    },
}
const actions = {}
const loginStore = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}

export default loginStore
