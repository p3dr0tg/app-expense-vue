import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        auth: {
            isAuth: localStorage.getItem('app_expense_is_auth') === 'true',
            user: null,
            account:{
                id:0
            }
        },
        guestState: true,
        total:0,
        accountList:[]
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
            //console.log('logout mutations ',state)
            Vue.set(state.auth, 'isAuth', false);
            Vue.set(state.auth, 'user', null);
            Vue.set(state.auth, 'account', {});
            localStorage.setItem('app_expense_is_auth', false);
            localStorage.removeItem('app_expense_user');
            localStorage.removeItem('app_expense_user_account');
            Vue.set(state,'guestState',true);
            delete Vue.prototype.$http.defaults.headers.common['Authorization'];
            window.location.reload();
        },
        setAccountList:(state,rows)=>{
            Vue.set(state, 'accountList', rows);
        },
        setAccount: (state, account) => Vue.set(state.auth, 'account', account),
        account:(state, account)=>{
            Vue.set(state.auth, 'account', account);
            localStorage.setItem('app_expense_user_account', JSON.stringify(account));
        }
    },
    actions: {
        loadUser({commit, dispatch, getters}) {
            //console.log('loaduser');
            let user = localStorage.getItem('app_expense_user');
            if (user) {
                user = JSON.parse(user);
                commit('setUser', user)
                commit('setToken', user.api_token)
                commit('guestState', false);
            }
        },
        authLogout({commit, dispatch, getters}) {
            //console.log('auth_logout_actions');
            return new Promise((resolve, reject) => {
               // commit('auth_logout')
                commit('logout')
                commit('guestState', true);
                resolve()
            })
        },
        setFirstAccount({commit, dispatch, getters},{account}){
            //console.log('setFirst',account);
            let store_account = localStorage.getItem('app_expense_user_account');
            if(store_account==null || store_account==undefined){
                commit('account', account)
            }
        },
        setSelectAccount({commit, dispatch, getters},{account}){
            commit('account', account);
            window.location.reload();
        },
        loadAccount({commit, dispatch, getters}){
            let account = localStorage.getItem('app_expense_user_account');
            if (account) {
                account = JSON.parse(account);
                commit('setAccount', account)
            }
        }
    }
})
