export const state = () => {
    return {
        history: []
    }
}

export const mutations = {
    setHistory(state, data) {
        state.history.unshift(data)
        state.history = state.history.slice(0, 5);
    }
}