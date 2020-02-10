export const state = () => {
    return {
        userInfo: {
            user: {}
        }
    }
}

export const mutations = {
    setUserInfo(state, data) {
        state.userInfo = data
    }
}

// 使用actions实现异步获取数据
export const actions = {
    login(state, data) {
        return this.$axios({
            url: "/accounts/login",
            method: "POST",
            data
        }).then(res => {
            const { data } = res;
            state.commit("setUserInfo", data);
        });
    },
    getcaptchas(state, data) {
        return this.$axios({
            url: '/captchas',
            method: 'POST',
            data: {
                tel: data
            }
        }).then(res => {
            return res
        })
    }
}