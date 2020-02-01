import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from "./views/dashboard/Dashboard";
import Login from "./views/Login";
const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
}
Vue.use(Router)
import before from './middleware/before'
import redirect from './middleware/redirect'
const router=  new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name:'/',
            redirect:'/dashboard'
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: Dashboard
        },
        {
            path: '/Login',
            name: 'Login',
            component: Login,
            beforeEnter:redirect,
            meta:{
                guestGuard: true,
            }
        },
        {
            path: '/categories',
            name: 'categories',
            component: () => import(/* webpackChunkName: "about" */ './views/Category.vue')
        },
        {
            path: '/saving_accounts',
            name: 'saving_accounts',
            component: () => import(/* webpackChunkName: "about" */ './views/SavingAccount.vue')
        }
    ]
})
router.beforeEach(before);
export default router
