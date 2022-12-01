export default {

    namespaced: true,

    state: {
        authorization: localStorage.auth ? localStorage.auth : ''
    },

    getters: {
        getAuthorization: (state) => {
            return state.authorization
        },
        isAdmin: (state) => {
            return state.authorization === 'admin' ? true : false
        }
    },

    mutations: {
        SET_AUTH (state, type) {
            state.authorization = type
            localStorage.auth = state.authorization
        },
        RESET_AUTH (state) {
            state.authorization = ''
            localStorage.removeItem('auth')
        }
    }
    
}