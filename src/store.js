import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        auth: {
            isAuth: localStorage.getItem('app_expense_is_auth') === 'true',
            user: null,
        },
        guestState: true,
        total:0
    },
    mutations: {
        setTotal:(state,total)=>{
            Vue.set(state, 'total', total);
        },
        setUser: (state, user) => (state.auth.user = user),
        guestState: (state, value) => (state.guestState = value),
        setToken: (state, token) => {
            Vue.prototype.$http.defaults.headers.common['Authorization'] = `Bearer ${token}`
        },
        login: (state, user) => {
            Vue.set(state.auth, 'isAuth', true);
            Vue.set(state.auth, 'user', user);
            localStorage.setItem('app_expense_is_auth', true);
            localStorage.setItem('app_expense_user', JSON.stringify(user));
        },
        logout(state) {
            Vue.set(state.auth, 'isAuth', false);
            Vue.set(state.auth, 'user', null);
            localStorage.setItem('app_expense_is_auth', false);
            localStorage.removeItem('app_expense_user');
            Vue.set(state,'guestState',true);
            delete Vue.prototype.$http.defaults.headers.common['Authorization']
        },
    },
    actions: {
        loadUser({commit, dispatch, getters}) {
            console.log('loaduser');
            let user = localStorage.getItem('app_expense_user');
            if (user) {
                user = JSON.parse(user);
                commit('setUser', user)
                commit('setToken', user.api_token)
                commit('guestState', false);
            }
        },
        auth_logout({commit, dispatch}) {
            return new Promise((resolve, reject) => {
                commit('auth_logout')
                commit('logout')
                resolve()
            })
        }
    }
})
